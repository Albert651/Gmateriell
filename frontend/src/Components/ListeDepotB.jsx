import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Modal, ModalHeader,ModalBody,Button} from 'reactstrap'
import Liste from '../Components/img/img3.jpg';
import { faPen, faPlus, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from '../Components/Navbar/Navbar';

function ListeDepotB() {
    const [base, setMaterielBase] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    const [selectedItem, setSelectedItem] = useState({idD: null});
    

    useEffect(() => {
        axios.get('http://localhost:8081/ListeDepotB')
           .then(res => {
                const MaterielBaseData = res.data;
                setMaterielBase(MaterielBaseData);
            })
           .catch(err => console.log(err));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = base.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const toggleModal = () => setModalOpen(!modalOpen);

    const handleSelectItem = (item) => {
        setSelectedItem({...item, idD: item.idD});
        setModalType('modif');
        toggleModal(); // Ouvre la modal
    };
    
    const handleDeleteBase = (item) => {
        setSelectedItem({idD: item.idD});
        setModalType('delete');
        toggleModal(); // Ouvre la modal
    };
    
    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/depotB/${selectedItem.idD}`);
            toggleModal();;
            const updatedBase = base.map(item => item.idD === selectedItem.idD? selectedItem : item);
            setMaterielBase(updatedBase);
        } catch (err) {
            console.log(err);
        }
    }
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleModifO = async (event) => {
        event.preventDefault();
        try {
            // Vérifiez si selectedItem et selectedItem.idD ne sont pas undefined
            if (!selectedItem || !selectedItem.idD) {
                console.error("Identifiant de l'élément à mettre à jour non trouvé");
                return;
            }
    
            // Affichez les données selectedItem pour déboguer
            console.log("Données à envoyer :", selectedItem);
    
            // Mettre à jour l'élément dans la base de données
            await axios.put(`http://localhost:8081/depotB/${selectedItem.idD}`, {
                Nom: selectedItem.Nom,
                Marque: selectedItem.Marque, // Correction du nom de propriété
                Quantiter: selectedItem.Quantiter,
                Qualiter: selectedItem.Qualiter,
                Lien: selectedItem.Lien
            });
    
            console.log('Modification réussie');
            toggleModal(); // Ferme la modal après la modification réussie
            // Mettre à jour les données locales sans recharger la page
            const updatedBase = base.map(item => item.idD === selectedItem.idD ? selectedItem : item);
            setMaterielBase(updatedBase);
        } catch (err) {
            console.error(err);
            // Gérer les erreurs côté client ici
        }
    };

    return (
        <div>
            <Navbar />

        <div className='d-flex vh-40 justify-content-center align-items-center'>
            <div className="row">
                <div className="col-md-2 mt-4 bg-dark rounded">
                    <img src={Liste} alt="" style={{ width: '100%', height: 'auto', marginTop: '8rem' }} className='rounded-circle' />
                </div>
                <div className='col-md-9 bg-transparent text-light rounded p-3'>
                    <h2 className='text-primary'>Liste Matérielle au depotB</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to='/depotB' className='btn btn-success mt-2'>
                                <FontAwesomeIcon icon={faPlus} /> Nouveau matériel
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <form className="d-flex" role="search">
                                <input
                                    className="form-control mb-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <button className="btn btn-outline-primary ml-2" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                            </form>
                        </div>
                    </div>
             
            <table className='table table-dark table-striped text-light mt-4'>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Marque</th>
                        <th>Quantiter</th>
                        <th>Qualiter</th>
                        <th>Liens</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems
                       .filter(data =>
                            (data.NomDB && data.NomDB.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (data.MarqueDB && data.MarqueDB.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (data.QualiterDB && data.QualiterDB.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (data.LienDB && data.LienDB.toLowerCase().includes(searchTerm.toLowerCase()))
                        )
                       .map((data, i) => (
                            <tr key={i}>
                                <td>{data.NomDB}</td>
                                <td>{data.MarqueDB}</td>
                                <td>{data.QuantiterDB}</td>
                                <td>{data.QualiterDB}</td>
                                <td>{data.LienDB}</td>
                                <td>
                                    <Link onClick={() => handleSelectItem(data)} className='btn btn-primary ms-2'>
                                        <FontAwesomeIcon icon={faPen} /> 
                                    </Link>
                                    <button className='btn btn-danger ms-2' onClick={(e) => handleDeleteBase(data)}>
                                        <FontAwesomeIcon icon={faTrash} /> 
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <nav>
                <ul className='pagination'>
                    {Array.from({ length: Math.ceil(base.length / itemsPerPage) }).map((_, index) => (
                        <li key={index} className='page-item'>
                            <button onClick={() => paginate(index + 1)} className='page-link'>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div>
                <h4 className='text-primary'>Signification du bouton</h4>
                <button className='btn btn-primary ms-2'>
                    <FontAwesomeIcon icon={faPen} /> : Modification
                </button>
                <button className='btn btn-danger ms-2'>
                    <FontAwesomeIcon icon={faTrash} /> : Suppression
                </button>
            </div>
            </div>
            </div>
            <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader className='text-primary' toggle={toggleModal}>{modalType === 'modif'? 'Modifier l\'élément' : 'Confirmation de suppression'}</ModalHeader>
                <ModalBody>
                    {modalType === 'modif' && (
                        <form onSubmit={handleModifO}>
                        <div className='mb-3'>
                            <label htmlFor=''className='text-secondary'>Nom</label>
                            <input type='text'  required className='form-control' value={selectedItem?.Nom || ''} onChange={e => setSelectedItem({...selectedItem, Nom: e.target.value})} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='' className='text-secondary'>Marque</label>
                            <input type="text" required className='form-control' value={selectedItem?.Marque || ''} onChange={e => setSelectedItem({...selectedItem, Marque: e.target.value})} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='' className='text-secondary'>Quantiter</label>
                            <input type="number" required className='form-control' value={selectedItem?.Quantiter || ''} onChange={e => setSelectedItem({...selectedItem, Quantiter: e.target.value})} />
                        </div>
                        <div className='mb-3' >
                            <label htmlFor='' className='text-secondary' >Qualiter</label>
                            <input type="text" className='form-control' value={selectedItem?.Qualiter || ''} onChange={e => setSelectedItem({...selectedItem, Qualiter: e.target.value})} />
                        </div>
                        <div className='mb-3' >
                            <label htmlFor='' className='text-secondary' >Lien</label>
                            <input type="text" className='form-control' value={selectedItem?.Lien || ''} onChange={e => setSelectedItem({...selectedItem, Lien: e.target.value})} />
                        </div>
                        <Button color="primary" type="submit">Sauvegarder</Button>
                    </form>
                    )}
                    {modalType === 'delete' && (
                    <>
                    <div className='align-items-center justify-content-center'>
                        <h6>Êtes-vous sûr de vouloir supprimer cet élément?</h6>
                    </div>
                    
                    <div className="modal-footer align-items-center justify-content-center">
                        <Button color="secondary" onClick={toggleModal}>Annuler</Button>
                        <Button color="danger" onClick={handleConfirmDelete}>Supprimer</Button>
                    </div>
                </>
                )}

                    
                </ModalBody>
            </Modal>
        </div>
        </div>
        
    );
}

export default ListeDepotB;

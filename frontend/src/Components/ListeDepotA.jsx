import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import Liste from '../Components/img/img3.jpg';
import { faPen, faPlus, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from '../Components/Navbar/Navbar';

function ListeDepotA() {
    const [base, setMaterielBase] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedItem, setSelectedItem] = useState({ idDB: null });

    useEffect(() => {
        axios.get('http://localhost:8081/ListeDepotA')
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
        setSelectedItem({ ...item, idDB: item.idDB });
        setModalType('modif');
        toggleModal();
    };

    const handleDeleteBase = (item) => {
        setSelectedItem({ idDB: item.idDB });
        setModalType('delete');
        toggleModal();
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/depotA/${selectedItem.idDB}`);
            toggleModal();
            setMaterielBase(base.filter(item => item.idDB !== selectedItem.idDB));
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleModifA = async (event) => {
        event.preventDefault();
        try {
            if (!selectedItem || !selectedItem.idDB) {
                console.error("Identifiant de l'élément à mettre à jour non trouvé");
                return;
            }

            await axios.put(`http://localhost:8081/depotA/${selectedItem.idDB}`, {
                NomDB: selectedItem.NomDB,
                MarqueDB: selectedItem.MarqueDB,
                QuantiterDB: selectedItem.QuantiterDB,
                QualiterDB: selectedItem.QualiterDB,
                LienDB: selectedItem.LienDB
            });

            toggleModal();
            const updatedBase = base.map(item => item.idDB === selectedItem.idDB ? selectedItem : item);
            setMaterielBase(updatedBase);
        } catch (err) {
            console.error(err);
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
                        <h2 className='text-primary'>Liste Matérielle au depotA</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <Link to='/depotA' className='btn btn-success mt-2'>
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
                                {Array.isArray(currentItems)
                                 && currentItems
                                    .filter(data =>
                                        (data.nomD && data.nomD.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                        (data.marqueD && data.marqueD.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                        (data.qualiterD && data.qualiterD.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                        (data.lienD && data.lienD.toLowerCase().includes(searchTerm.toLowerCase()))
                                    )
                                    .map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.nomD}</td>
                                            <td>{data.marqueD}</td>
                                            <td>{data.quantiterD}</td>
                                            <td>{data.qualiterD}</td>
                                            <td>{data.lienD}</td>
                                            <td>
                                                <Link onClick={() => handleSelectItem(data)} className='btn btn-primary ms-2'>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Link>
                                                <button className='btn btn-danger ms-2' onClick={() => handleDeleteBase(data)}>
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
                        <form onSubmit={handleModifA}>
                        <div className='mb-3'>
                            <label htmlFor=''className='text-secondary'>Nom</label>
                            <input type='text'  required className='form-control' value={selectedItem?.NomDB || ''} onChange={e => setSelectedItem({...selectedItem, NomDB: e.target.value})} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='' className='text-secondary'>Marque</label>
                            <input type="text" required className='form-control' value={selectedItem?.MarqueDB || ''} onChange={e => setSelectedItem({...selectedItem, MarqueDB: e.target.value})} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='' className='text-secondary'>Quantiter</label>
                            <input type="number" required className='form-control' value={selectedItem?.QuantiterDB || ''} onChange={e => setSelectedItem({...selectedItem, QuantiterDB: e.target.value})} />
                        </div>
                        <div className='mb-3' >
                            <label htmlFor='' className='text-secondary' >Qualiter</label>
                            <input type="text" className='form-control' value={selectedItem?.QualiterDB || ''} onChange={e => setSelectedItem({...selectedItem, QualiterDB: e.target.value})} />
                        </div>
                        <div className='mb-3' >
                            <label htmlFor='' className='text-secondary' >Lien</label>
                            <input type="text" className='form-control' value={selectedItem?.LienDB || ''} onChange={e => setSelectedItem({...selectedItem, LienDB: e.target.value})} />
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

export default ListeDepotA

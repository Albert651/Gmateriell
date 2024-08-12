import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import Liste from '../Components/img/img3.jpg';
import { faPen, faPlus, faTrash, faSearch, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from '../Components/Navbar/Navbar';

function ListeBase() {
    const [base, setMaterielBase] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedItem, setSelectedItem] = useState({ idB: null });

    const [Nom, setNom] = useState('');
    const [MarqueB, setMarqueB] = useState('');
    const [Quantiter, setQuantierB] = useState('');
    const [Qualiter, setQualiterB] = useState('');
    const [Lien, setLien] = useState('');

    const navigate = useNavigate('/');

    useEffect(() => {
        axios.get('http://localhost:8081/ListeBase')
            .then(res => {
                const MaterielBaseData = Array.isArray(res.data) ? res.data : [];
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
        setSelectedItem({ ...item, idB: item.idB });
        setModalType('modif');
        toggleModal();
    };

    const handleDeleteBase = (id) => {
        setSelectedItem({ idB: id });
        setModalType('delete');
        toggleModal();
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/ListeBase/${selectedItem.idB}`);
            const updatedBase = base.filter(item => item.idB !== selectedItem.idB);
            setMaterielBase(updatedBase);
            toggleModal();
        } catch (err) {
            console.log(err);
        }
    }

    const handleAjoutAuDepot = (item) => {
        setSelectedItem(item);
        setModalType('ajout');
        toggleModal();
    }

    const handleAjout = () => {
        setModalType('ajout1');
        toggleModal();
    }

    const handleConfirmAjoutAuDepot = async () => {
        const item = selectedItem;
        try {
            // Ajout au dépôt
            await axios.post(`http://localhost:8081/ListeBase/${item.idB}`, {
                Nom: item.Nom,
                MarqueB: item.MarqueB,
                Quantiter: item.Quantiter,
                Qualiter: item.Qualiter,
                Lien: item.Lien
            });
            // Suppression de la liste de base
            await axios.delete(`http://localhost:8081/ListeBase/${item.idB}`);
            const updatedBase = base.filter(it => it.idB !== item.idB);
            setMaterielBase(updatedBase);
            toggleModal();
            navigate('/liste-depotA');
        } catch (err) {
            console.log(err);
        }
    }

    /****ICI C4EST L4AJOUT DU DONNER ***/
    function handleAjoutConfirm(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/ListeBase', {
            Nom,
            MarqueB,
            Quantiter,
            Qualiter,
            Lien
        })
            .then(res => {
                console.log(res);
                navigate('/ListeBase');
            })
            .catch(err => console.log(err));
    }

    /***************************************************************** */

    const handleModif = async (event) => {
        event.preventDefault();
        try {
            if (!selectedItem || !selectedItem.idB) {
                console.error("Identifiant de l'élément à mettre à jour non trouvé");
                return;
            }

            await axios.put(`http://localhost:8081/ListeBase/${selectedItem.idB}`, {
                Nom: selectedItem.Nom,
                MarqueB: selectedItem.MarqueB,
                Quantiter: selectedItem.Quantiter,
                Qualiter: selectedItem.Qualiter,
                Lien: selectedItem.Lien
            });

            const updatedBase = base.map(item => item.idB === selectedItem.idB ? selectedItem : item);
            setMaterielBase(updatedBase);
            toggleModal();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Navbar />

            <div className='d-flex vh-40 justify-content-center align-items-center mt-3'>

                <div className="row">
                    <div className="col-md-2 bg-dark mt-4 rounded">
                        <img src={Liste} alt="" style={{ width: '100%', height: 'auto', marginTop: '8rem' }} className='rounded-circle' />
                    </div>
                    <div className='col-md-9 bg-transparent text-light rounded p-3'>
                        <h2 className='text-primary'>Liste Matérielle Base</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <Button color="success" onClick={handleAjout}>
                                    <FontAwesomeIcon icon={faPlus} /> Nouveau matériel
                                </Button>
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
                                {Array.isArray(currentItems) &&
                                    currentItems
                                        .filter(data =>
                                            data.Nom &&
                                            (data.Nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                data.MarqueB.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                data.Qualiter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                data.Lien.toLowerCase().includes(searchTerm.toLowerCase()))
                                        )
                                        .map((data, i) => (
                                            <tr key={i}>
                                                <td>{data.Nom}</td>
                                                <td>{data.MarqueB}</td>
                                                <td>{data.Quantiter}</td>
                                                <td>{data.Qualiter}</td>
                                                <td>{data.Lien}</td>
                                                <td>
                                                    <Link onClick={() => handleSelectItem(data)} className='btn btn-primary ms-2'>
                                                        <FontAwesomeIcon icon={faPen} />
                                                    </Link>
                                                    <button className='btn btn-danger ms-2' onClick={() => handleDeleteBase(data.idB)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                    <button className='btn btn-success ms-2' onClick={() => handleAjoutAuDepot(data)}>
                                                        <FontAwesomeIcon icon={faRightToBracket} />
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
                        <div className='mt-0.2rem'>
                            <h4 className='text-primary'>Signification du bouton</h4>
                            <button className='btn btn-primary ms-2'>
                                <FontAwesomeIcon icon={faPen} /> : Modification
                            </button>
                            <button className='btn btn-danger ms-2'>
                                <FontAwesomeIcon icon={faTrash} /> : Suppression
                            </button>
                            <button className='btn btn-success ms-2'>
                                <FontAwesomeIcon icon={faRightToBracket} /> : envoyer vers depot
                            </button>
                        </div>
                    </div>
                </div>
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader className='text-primary bg-warning' toggle={toggleModal}>
                    {modalType === 'modif' ? 'Modifier l\'élément' : modalType === 'delete' ? 'Confirmation de suppression' : 'Ajout Materiel'}
                </ModalHeader>
                <ModalBody>
                    {modalType === 'modif' && (
                        <form onSubmit={handleModif}>
                            <div className='mb-3'>
                                <label htmlFor='' className='text-secondary'>Nom</label>
                                <input type='text' required className='form-control' value={selectedItem?.Nom || ''} onChange={e => setSelectedItem({...selectedItem, Nom: e.target.value})} />
                            </div>
                        <div className='mb-3'>
                            <label htmlFor='' className='text-secondary'>Marque</label>
                            <input type="text" required className='form-control' value={selectedItem?.MarqueB || ''} onChange={e => setSelectedItem({...selectedItem, MarqueB: e.target.value})} />
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
                    {modalType === 'ajout1' && (
                        <form onSubmit={handleAjoutConfirm}>
                            <div className='mb-3'>
                                <label htmlFor='' className='text-secondary'>Nom</label>
                                <input type='text' required className='form-control'  onChange={e => setNom(e.target.value)} />
                            </div>
                        <div className='mb-3'>
                            <label htmlFor='' className='text-secondary'>Marque</label>
                            <input type="text" required className='form-control'onChange={e => setMarqueB(e.target.value)}/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='' className='text-secondary'>Quantiter</label>
                            <input type="number" required className='form-control' onChange={e => setQuantierB(e.target.value)} />
                        </div>
                        <div className='mb-3' >
                            <label htmlFor='' className='text-secondary' >Qualiter</label>
                            <input type="text" className='form-control' onChange={e => setQualiterB(e.target.value)} />
                        </div>
                        <div className='mb-3' >
                            <label htmlFor='' className='text-secondary' >Lien</label>
                            <input type="text" className='form-control' onChange={e => setLien(e.target.value)} />
                        </div>
                        <Button color="primary" type="submit">
                        <FontAwesomeIcon icon={faPlus} />Sauvegarder</Button>
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

                {modalType === 'ajout' && (
                    <>
                    <div className='align-items-center justify-content-center'>
                        <h6>Êtes-vous  vouloir d'ajout  cet élément au depot ?</h6>
                    </div>
                    
                    <div className="modal-footer align-items-center justify-content-center">
                        <Button color="secondary" onClick={toggleModal}>NON</Button>
                        <Button color="success" onClick={handleConfirmAjoutAuDepot}>OUI</Button>
                    </div>
                </>
                )}
                </ModalBody>
            </Modal>
           
        </div>
        </div>
    );
}

export default ListeBase;

               
 


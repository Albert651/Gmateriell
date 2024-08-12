import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import Liste from '../Components/img/img3.jpg';
import { faPen, faPlus, faTrash, faSearch, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from '../Components/Navbar/Navbar';

function ListeOutils() {
    const [outils, setOutils] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedItem, setSelectedItem] = useState({ IdO: null });

    const navigate = useNavigate();
    const [Nom, setNom] = useState('');
    const [MarqueB, setMarqueB] = useState('');
    const [Quantiter, setQuantierB] = useState('');
    const [Qualiter, setQualiterB] = useState('');
    const [Lien, setLien] = useState('');


    useEffect(() => {
        axios.get('http://localhost:8081/ListeOutil')
            .then(res => {
                const Outils = res.data;
                setOutils(Array.isArray(Outils) ? Outils : []);
            })
            .catch(err => console.log(err));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = outils.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleAjout = () => {
        setModalType('ajout1');
        toggleModal();
    }

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setModalType('modif');
        toggleModal();
    };

    const handleDeleteBase = (id) => {
        setSelectedItem({ IdO: id });
        setModalType('delete');
        toggleModal();
    };

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

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/outils/${selectedItem.IdO}`);
            const updatedBase = outils.filter(item => item.IdO !== selectedItem.IdO);
            setOutils(updatedBase);
            toggleModal();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAjoutAuDepot = (item) => {
        setSelectedItem(item);
        setModalType('ajout');
        toggleModal();
    };

    const handleConfirmAjoutAuDepotB = async () => {
        if (!selectedItem || !selectedItem.IdO) {
            console.error("Aucun élément sélectionné ou IdO manquant.");
            return;
        }
        const item = selectedItem;
        console.log("Ajout de l'élément au dépôt :", item);

        try {
            const ajoutResponse = await axios.post(`http://localhost:8081/depotB/${item.IdO}`, {
                nomO: item.nomO,
                marqueO: item.marqueO,
                quantiterO: item.quantiterO,
                qualiterO: item.qualiterO,
                lienO: item.lienO
            });
            console.log("Réponse de l'ajout au dépôt :", ajoutResponse);

            const suppressionResponse = await axios.delete(`http://localhost:8081/outils/${item.IdO}`);
            console.log("Réponse de la suppression de l'élément :", suppressionResponse);

            const updatedBase = outils.filter(it => it.IdO !== item.IdO);
            setOutils(updatedBase);
            toggleModal();
            navigate('/liste-depotB');
        } catch (err) {
            console.error("Erreur lors de l'ajout au dépôt :", err);
        }
    };

    const handleModifO = async (event) => {
        event.preventDefault();
        try {
            if (!selectedItem || !selectedItem.IdO) {
                console.error("Identifiant de l'élément à mettre à jour non trouvé");
                return;
            }

            console.log("Données à envoyer :", selectedItem);

            await axios.put(`http://localhost:8081/outils/${selectedItem.IdO}`, {
                nomO: selectedItem.nomO,
                marqueO: selectedItem.marqueO,
                quantiterO: selectedItem.quantiterO,
                qualiterO: selectedItem.qualiterO,
                lienO: selectedItem.lienO
            });

            console.log('Modification réussie');
            const updatedBase = outils.map(item => item.IdO === selectedItem.IdO ? selectedItem : item);
            setOutils(updatedBase);
            toggleModal();
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
                        <h2 className='text-primary'>Liste Matérielle Outils</h2>
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
                                {Array.isArray(currentItems) && currentItems
                                    .filter(data => data && data.nomO &&
                                        (data.nomO.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            data.marqueO.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            data.qualiterO.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            data.lienO.toLowerCase().includes(searchTerm.toLowerCase()))
                                    )
                                    .map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.nomO}</td>
                                            <td>{data.marqueO}</td>
                                            <td>{data.quantiterO}</td>
                                            <td>{data.qualiterO}</td>
                                            <td>{data.lienO}</td>
                                            <td>
                                                <Link onClick={() => handleSelectItem(data)} className='btn btn-primary ms-2'>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Link>
                                                <button className='btn btn-danger ms-2' onClick={(e) => handleDeleteBase(data.IdO)}>
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
                                {Array.from({ length: Math.ceil(outils.length / itemsPerPage) }).map((_, index) => (
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
                    {modalType === 'modif' && (
                        <form onSubmit={handleModifO}>
                        <div className='mb-3'>
                            <label htmlFor=''className='text-secondary'>Nom</label>
                            <input type='text'  required className='form-control' value={selectedItem?.nomO || ''} onChange={e => setSelectedItem({...selectedItem, nomO: e.target.value})} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='' className='text-secondary'>Marque</label>
                            <input type="text" required className='form-control' value={selectedItem?.marqueO || ''} onChange={e => setSelectedItem({...selectedItem, marqueO: e.target.value})} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='' className='text-secondary'>Quantiter</label>
                            <input type="number" required className='form-control' value={selectedItem?.quantiterO || ''} onChange={e => setSelectedItem({...selectedItem, quantiterO: e.target.value})} />
                        </div>
                        <div className='mb-3' >
                            <label htmlFor='' className='text-secondary' >Qualiter</label>
                            <input type="text" className='form-control' value={selectedItem?.qualiterO || ''} onChange={e => setSelectedItem({...selectedItem, qualiterO: e.target.value})} />
                        </div>
                        <div className='mb-3' >
                            <label htmlFor='' className='text-secondary' >Lien</label>
                            <input type="text" className='form-control' value={selectedItem?.lienO || ''} onChange={e => setSelectedItem({...selectedItem, lienO: e.target.value})} />
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

                {modalType === 'ajout' && (
                    <>
                    <div className='align-items-center justify-content-center'>
                        <h6>Êtes-vous  vouloir d'ajout  cet élément au depot ?</h6>
                    </div>
                    
                    <div className="modal-footer align-items-center justify-content-center">
                        <Button color="secondary" onClick={toggleModal}>Annuler</Button>
                        <Button color="success" onClick={handleConfirmAjoutAuDepotB}>Ajout</Button>
                    </div>
                </>
                )}
                    
                   
                    
                </ModalBody>
            </Modal>
        </div>
        </div>
    );
}

export default ListeOutils;


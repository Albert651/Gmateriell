import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Liste from '../Components/img/img3.jpg';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { faPen, faPlus, faSearch, faTrash, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from '../Components/Navbar/Navbar';

function ListeLane() {
    const [base, setMaterielLane] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedItem, setSelectedItem] = useState({});
    const [ajoutReussi, setAjoutReussi] = useState(false);

    const [nomL, setNomL] = useState('');
    const [marqueL, setMarqueL] = useState('');
    const [quantiteL, setQuantiteL] = useState('');
    const [qualiterL, setQualiterL] = useState('');
    const [lienL, setLienL] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/ListeLane')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setMaterielLane(res.data);
                } else {
                    console.error("Les données reçues ne sont pas un tableau :", res.data);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = Math.max(indexOfLastItem - itemsPerPage, 0);
    const currentItems = base.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleAjoutLane = () => {
        setModalType('ajout1');
        toggleModal();
    };

    const handleSelectItem = (item) => {
        setSelectedItem({ ...item });
        setModalType('modif');
        toggleModal();
    };

    const handleDeleteBase = (item) => {
        setSelectedItem({ idL: item.idL });
        setModalType('delete');
        toggleModal();
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8081/ListeLane/${selectedItem.idL}`);
            toggleModal();
            const updatedBase = base.filter(item => item.idL !== selectedItem.idL);
            setMaterielLane(updatedBase);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAjoutConfirm = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/ListeLane', {
            nomL,
            marqueL,
            quantiteL,
            qualiterL,
            lienL
        })
        .then(res => {
            console.log(res);
            setAjoutReussi(true);
        })
        .catch(err => console.log(err));
    };
    
    useEffect(() => {
        if (ajoutReussi) {
            navigate('/ListeLane');
        }
    }, [ajoutReussi, navigate]);
    
    const handleAjoutAuDepot = (item) => {
        setSelectedItem(item);
        setModalType('ajout');
        toggleModal();
    };

    const handleConfirmAjoutAuDepotB = async () => {
        const item = selectedItem;
        try {
            await axios.post(`http://localhost:8081/depotA/${item.idL}`, {
                nomL: item.nomL,
                marqueL: item.marqueL,
                quantiteL: item.quantiteL,
                qualiterL: item.qualiterL,
                lienL: item.lienL
            });
            await axios.delete(`http://localhost:8081/ListeLane/${item.idL}`);
            
            const updatedBase = base.filter(it => it.idL !== item.idL);
            setMaterielLane(updatedBase);
            toggleModal();
            navigate('/ListeLane');
        } catch (err) {
            console.error("Erreur lors de l'ajout au dépôt:", err);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleModifB = async (event) => {
        event.preventDefault();
        try {
            if (!selectedItem || !selectedItem.idL) {
                console.error("Identifiant de l'élément à mettre à jour non trouvé");
                return;
            }

            await axios.put(`http://localhost:8081/ListeLane/${selectedItem.idL}`, {
                nomL: selectedItem.nomL,
                marqueL: selectedItem.marqueL,
                quantiteL: selectedItem.quantiteL,
                qualiterL: selectedItem.qualiterL,
                lienL: selectedItem.lienL
            });

            const updatedBase = base.map(item => item.idL === selectedItem.idL ? selectedItem : item);
            setMaterielLane(updatedBase);
            toggleModal();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Home/>

            <div className='d-flex vh-40 justify-content-center align-items-center'>
                <div className="row">
                    <div className="col-md-2 mt-4 bg-dark rounded">
                        <img src={Liste} alt="" style={{ width: '100%', height: 'auto', marginTop: '8rem'}} className='rounded-circle'/>
                    </div>
                    <div className='col-md-9 bg-transparent text-light rounded p-3'>
                        <h2 className='text-primary'>Liste Matérielle Lane</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <Button className='btn btn-success mt-2' onClick={handleAjoutLane}>
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
                                    <th>Quantité</th>
                                    <th>Qualité</th>
                                    <th>Liens</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems
                                    .filter(data => data && data.nomL &&
                                        (data.nomL.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        data.marqueL.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        data.qualiterL.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        data.lienL.toLowerCase().includes(searchTerm.toLowerCase()))
                                    )
                                    .map((data, i) => (
                                        <tr key={i}>
                                            <td>{data.nomL}</td>
                                            <td>{data.marqueL}</td>
                                            <td>{data.quantiteL}</td>
                                            <td>{data.qualiterL}</td>
                                            <td>{data.lienL}</td>
                                            <td>
                                                <Link onClick={() => handleSelectItem(data)} className='btn btn-primary ms-2'>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Link>
                                                <button className='btn btn-danger ms-2' onClick={(e) => handleDeleteBase(data)}>
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
                                {Array.from({ length: Math.ceil(base.length / itemsPerPage)}).map((_, index) => (
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
            </div>
            <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader className='text-primary bg-warning' toggle={toggleModal}>
                {modalType === 'modif' ? 'Modifier l\'élément' : modalType === 'delete' ? 'Confirmation de suppression' : 'Ajout Materiel'}
            </ModalHeader>
            <ModalBody>
            {modalType === 'modif' && (
             <form onSubmit={handleModifB}>
                 <div className='mb-3'>
                    <label htmlFor='nomL' className='text-secondary'>Nom</label>
                    <input
                    type='text'
                    id='nomL'
                    required
                    className='form-control'
                    value={selectedItem?.nomL || ''}
                    onChange={e => setSelectedItem({...selectedItem, nomL: e.target.value})}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='marqueL' className='text-secondary'>Marque</label>
                    <input
                    type='text'
                    id='marqueL'
                    required
                    className='form-control'
                    value={selectedItem?.marqueL || ''}
                    onChange={e => setSelectedItem({...selectedItem, marqueL: e.target.value})}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='quantiteL' className='text-secondary'>Quantité</label>
                    <input
                        type='number'
                        id='quantiteL'
                        required
                        className='form-control'
                        value={selectedItem?.quantiteL || ''}
                        onChange={e => setSelectedItem({...selectedItem, quantiteL: e.target.value})}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='qualiterL' className='text-secondary'>Qualité</label>
                    <input
                        type='text'
                        id='qualiterL'
                        className='form-control'
                        value={selectedItem?.qualiterL || ''}
                        onChange={e => setSelectedItem({...selectedItem, qualiterL: e.target.value})}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='lienL' className='text-secondary'>Lien</label>
                    <input
                        type='text'
                        id='lienL'
                        className='form-control'
                        value={selectedItem?.lienL || ''}
                        onChange={e => setSelectedItem({...selectedItem, lienL: e.target.value})}
                    />
                </div>
                <Button color="primary" type="submit">Sauvegarder</Button>
         </form>
        )}
                    {modalType === 'ajout1' && (
                        <form onSubmit={handleAjoutConfirm}>
                        <div className='mb-3'>
                            <label htmlFor=''className='text-secondary'>Nom</label>
                            <input type='text'  required className='form-control'  onChange={e => setNomL( e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='' className='text-secondary'>Marque</label>
                            <input type="text" required className='form-control' onChange={e => setMarqueL( e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='' className='text-secondary'>Quantiter</label>
                            <input type="number" required className='form-control'  onChange={e => setQuantiteL( e.target.value)} />
                        </div>
                        <div className='mb-3' >
                            <label htmlFor='' className='text-secondary' >Qualiter</label>
                            <input type="text" className='form-control' onChange={e => setQualiterL( e.target.value)} />
                        </div>
                        <div className='mb-3' >
                            <label htmlFor='' className='text-secondary' >Lien</label>
                            <input type="text" className='form-control' onChange={e => setLienL( e.target.value)} />
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
                        <Button color="success" onClick={handleConfirmAjoutAuDepotB}>OUI</Button>
                    </div>
                </>
                )}
                    

                    
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ListeLane;

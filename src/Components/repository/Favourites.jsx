import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

const Favourites = (props,{favRepositories}) => {
    const [modalIsOpen , setModalIsOpen] = React.useState(true);
    const  closeModal = () => {
        setModalIsOpen(false);
        props.onCloseFav();
    }
    const styles = {
        modal : {
            top: "50%" ,
            left: "50%",
            right: 'auto',
            bottom : 'aut0',
            marginRight: '-50%',
            transform : 'translate(-50%,-50%)',
            width:'900px',
            maxHeight : '400px',
        }
    }
    return (
        <div className="table-view">
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={() =>closeModal()}
            style={styles}
            >
            <div style={{textAlign: "center", float: "left"}}>
                <span>Favourites List</span>
            </div>
            <button className="close-popup text-right" style={{float:"right"}} title="Close" onClick={() => closeModal()}>X</button>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Repository Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.favRepositories ? props.favRepositories.map((repo, index) => 
                            <tr>
                                <td scope="row">{index}</td>
                                <td>{repo.name}</td>
                                <td>{repo.full_name}</td>
                                <td>{repo.html_url}</td>
                            </tr>
                        ) : ''
                        }
                    </tbody>
                </table>
            </Modal>
        </div>
    );
}

let mapStateToProps = state => {
    return {
        favRepositories: state.RepositoryReducer.favRepositories,
    }
}
export default connect(mapStateToProps, null)(Favourites);

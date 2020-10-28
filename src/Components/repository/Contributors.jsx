import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

const Contributors = (props) => {
    const [modalIsOpen , setModalIsOpen] = React.useState(true);
    const  closeModal = () => {
        setModalIsOpen(false);
        props.onCloseContributor();
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
                <span>Contributors List</span>
            </div>
            <button className="close-popup text-right" title="Close" style={{float:"right"}} onClick={() => closeModal()}>X</button>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Type</th>
                            <th scope="col">Contributions</th>
                            <th scope="col">User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.contributors ? props.contributors.map((cont, index) => 
                            <tr>
                                <td scope="row">{index}</td>
                                <td>{cont.login}</td>
                                <td>{cont.contributions}</td>
                                <td>{cont.type}</td>
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
        contributors: state.RepositoryReducer.contributors,
    }
}
export default connect(mapStateToProps, null)(Contributors);

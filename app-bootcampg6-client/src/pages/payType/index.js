import React, {Component} from 'react';
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {connect} from "react-redux";
import Pagination from "react-js-pagination";

@connect(({payType}) => ({payType}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddModal: false,
      currentPayTypeSize: '',
      tempId: '',
      showDeletingModal: false,
      // activePage: 1
    }
  }
  componentDidMount() {
    this.itemsInState()
    console.log(this.itemsInState())
  }

  itemsInState = () => {
    const {dispatch} = this.props;
    console.log(this.props, "this is region stat");
    dispatch({
      type: 'payType/getAllPayTypes',
    })
  };


  render() {
    const {dispatch, payType} = this.props;
    const {payTypePage} = payType;

    const addPayType = () => {
      this.setState({
        isAddModal: !this.state.isAddModal, currentPayTypeSize: ''
      })
    };
    const editPayType = (item) => {
      this.setState({
        isAddModal: !this.state.isAddModal, currentPayTypeSize: item
      })
    };
    const deletePayType = (payTypeId) => {
      this.setState({tempId: payTypeId, showDeletingModal: !this.state.showDeletingModal})
    };
    const toggleDeleteModal = () => {
      this.setState({tempId: '', showDeletingModal: !this.state.showDeletingModal})
    };
    const RowIsDel =()=>{
      if (this.state.tempId) {
        dispatch({
          type: 'payType/deletePayType',
          payload: {
            id: this.state.tempId
          }
        }).then(res => {
          this.itemsInState();
          this.setState({showDeletingModal: !this.state.showDeletingModal})
        })
      }
    }
    const payTypeSaveOrEdit = (e, v) => {
      if (this.state.currentPayTypeSize) {
        v = {...v, id: this.state.currentPayTypeSize.id}
      }
      dispatch({
        type: 'payType/saveOrEditPayType',
        payload: v
      }).then(res => {
        this.itemsInState();
        this.setState({isAddModal: !this.state.isAddModal, currentPayTypeSize: ''})
      })
    };
    const changeActive = (item) => {
      this.state({})
    }
    const changeEnabled = (id, active) => {
      // console.log(id, 'mana item id')
      dispatch({
        type: 'payType/blockOrActivatePayType',
        payload: {
          id,
          active
        }
      }).then(res => {
        dispatch({
          type: 'payType/getAllPayTypes'
        })
      })
    }

    return (
      <div>
        <Row className="p-0 m-0">
          <Col md={{size: 2, offset: 5}}>
            <h3>To'lov turi</h3>
          </Col>
        </Row>
        <Row>
          <Col className="mt-2" md={{size: 10, offset: 1}}>
            <Button onClick={addPayType} color="primary" style={{borderRadius: "20px"}}>Add new PayType</Button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={{size: 10, offset: 1}}>
            <Table>
              <thead>
              <tr>
                <th>№</th>
                <th>NameUz</th>
                <th>NameRu</th>
                <th>Active</th>
                <th>Opiration</th>
              </tr>
              </thead>
              <tbody>
              {payTypePage ?
                payTypePage.map((item, index) =>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.nameUz}</td>
                    <td>{item.nameRu}</td>
                    <td><input type="checkbox" checked={item.active}/></td>
                    <td>
                      <Button outline onClick={() => editPayType(item) } color="warning">Edit</Button>
                      <Button className="ml-3" color="info"
                              onClick={() => changeEnabled(item.id, item.active ? false : true)}>{item.active ? "Bloklash" : "Aktivlashtirish"}</Button>

                      <Button outline onClick={() => deletePayType(item.id) } className="ml-2" color="danger">Delete</Button>
                    </td>
                  </tr>
                ) :
                <tr>
                  <td>Hozrda malumot mavjud emas</td>
                  <td>null</td>
                  <td>null</td>
                  <td>null</td>
                </tr>}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Modal isOpen={this.state.isAddModal} toggle={addPayType}>
          <ModalHeader
            toggle={addPayType}>
            {this.state.currentPayTypeSize ? "Editing 📝" : "Add new PayType 🖊"}
          </ModalHeader>
          <AvForm onValidSubmit={payTypeSaveOrEdit}>
            <ModalBody>
              <AvField required={true} type="text"
                       defaultValue={this.state.currentPayTypeSize ? this.state.currentPayTypeSize.nameUz : ''}
                       className="mt-2" placeholder="Enter PayType nameUz" name="nameUz"/>
              <AvField required={true} type="text"
                       defaultValue={this.state.currentPayTypeSize ? this.state.currentPayTypeSize.nameRu : ''}
                       className="mt-2" placeholder="Enter PayType nameRu" name="nameRu"/>
            </ModalBody>
            <ModalFooter>
              <Button outline onClick={addPayType}>Cancel</Button>
              <Button outline color="primary">{this.state.currentPayTypeSize ? "Etid" : "Save"}</Button>
            </ModalFooter>
          </AvForm>
        </Modal>
        <Modal isOpen={this.state.showDeletingModal} toggle={toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>To'lov turini o'chirishni istaysizmi?</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={toggleDeleteModal}>Bekor qilish</Button>
            <Button className="ml-3" color="info" type="button" onClick={RowIsDel}>O'chirish</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;

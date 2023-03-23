import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from 'react-redux'
import { update } from './fileInfoSlice'

/* //TODO:
 *       When file is loaded populate form fields
 * */

const FileInfo = (props) => {
    /* Show /Unshow the OffCanvas */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    const json = useSelector(state => state.fileInfo.value)
    const dispatch = useDispatch()

  // function onFieldChange(field, value) {
  //   props.setJson((oldJson) => {
  //     const newJson = { ...oldJson };
  //     newJson[field] = value;
  //     return newJson;
  //   });
  // }

  return (
    <>
      <Button
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          alignSelf: "flex-end",
        }}
        variant="primary"
        onClick={handleShow}
      >
        File Info
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Basic File Information</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form>
            <Table borderless size="sm">
              <tbody>
                {/* Dynamically creates the fields from the Json file and onChange functions */}
                {Object.keys(props.json).map((field, index) => {
                  if (index < 7)
                    return (
                      <tr key={index}>
                        <td>{`${field}:`}</td>
                        <td>
                          <input
                            value={json[field]}
                            onChange={(e) =>
                                dispatch(update(field, e.target.value))
                            }
                          />
                        </td>
                      </tr>
                    );
                  return null;
                })}
              </tbody>
            </Table>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default FileInfo;

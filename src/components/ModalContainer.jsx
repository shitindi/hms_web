import { Box, Dialog, Modal } from '@mui/material'
import React, { useState } from 'react'

const ModalContainer = ({ Component, setModal, entity = {}, modalOpen = false }) => {
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        borderRadius: "16px",
    };

    let [isModalOpen, setModalOpen] = useState(modalOpen)



    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            scroll="paper"
            paperp
            open={isModalOpen}
            PaperProps={{
                className: 'rounded-3xl',
            }}
        >

            <Component entity={entity} setOpen={setModalOpen} setModal={setModal} />

        </Dialog>
    )
}

{
    /*
  <Modal
        
            open={isModalOpen}
        >
            <Box sx={modalStyle} >
                <Component  entity= {entity} setOpen={setModalOpen} setModal={setModal} />
            </Box>
        </Modal>
    )

    */
}
export default ModalContainer

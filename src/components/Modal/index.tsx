import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { IBreweries } from "../../interface/breweriesInterface";

interface ModalInfoProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCard: IBreweries | null;
}

const ModalInfo: React.FC<ModalInfoProps> = ({ isOpen, onClose, selectedCard }) => {
  return (
    <Modal open={isOpen} onClose={onClose} >
      <Box className="rounded-lg text-gray-800" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, maxWidth: 500 }}>
        {selectedCard && (
          <>
            <Typography variant="h4">{selectedCard.name.replace(/[\d()-]+/g, "")}</Typography>
            <br />
            <Typography variant="body1">Type: {selectedCard.brewery_type}</Typography>
            <Typography variant="body1">Street: {selectedCard.address_1}</Typography>
            <Typography variant="body1">City: {selectedCard.city}</Typography>
            <Typography variant="body1">State: {selectedCard.state}</Typography>
            <Typography variant="body1">Postal Code: {selectedCard.postal_code}</Typography>
            <Typography variant="body1">Coutry: {selectedCard.country}</Typography>
            <Typography variant="body1">Website: {selectedCard.website_url}</Typography>
            <Typography variant="body1">Phone: {selectedCard.phone}</Typography>
            <Typography variant="body1">Open in Maps: {selectedCard.latitude}{selectedCard.longitude}</Typography>
            <br />
            <Button variant="contained" onClick={onClose}>Fechar</Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ModalInfo;

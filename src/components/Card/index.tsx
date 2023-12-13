import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IBreweries } from "../../interface/breweriesInterface";

interface CardInfoProps {
  brewery: IBreweries;
  onClick: () => void;
}

const getColorByBreweryType = (breweryType: string): string => {
  switch (breweryType) {
    case "micro":
      return "bg-blue-400";
    case "large":
      return "bg-green-400";
    case "brewpub":
      return "bg-yellow-400";
    case "closed":
      return "bg-red-400";
    case "contract":
      return "bg-purple-400";
    default:
      return "bg-gray-400";
  }
};

const CardInfo: React.FC<CardInfoProps> = ({ brewery, onClick }) => {
  const breweryTypeColor = getColorByBreweryType(brewery.brewery_type);

  const handleClick = () => {
    onClick();
  };

  return (
    brewery && ( // Utilizando a renderização condicional com &&
      <Card
        sx={{ minWidth: 275 }}
        className="m-3"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 20 }}>
            {brewery.name.replace(/[\d()-]+/g, "")}
          </Typography>
          <Typography variant="body2">
            {brewery.address_1}
            <br />
          </Typography>
          <Typography variant="body2">
            {brewery.city}, {brewery.state_province}
            <br />
          </Typography>
          <Typography variant="body2">
            {brewery.country}
            <br />
          </Typography>

          <div
            className={`w-24 rounded-sm flex justify-center ${breweryTypeColor}`}
          >
            {brewery.brewery_type}
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default CardInfo;

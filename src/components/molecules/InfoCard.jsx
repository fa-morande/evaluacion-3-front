import React from "react";
import Text from "../atoms/Text";
import "../../styles/molecules/infoCard.css";

const InfoCard = ({ title, children }) => {
    return (
        <div className="info-card">
            {title && (
                <Text variant="h1" className="info-card-title">
                    {title}
                </Text>
            )}
            <div className="info-card-content">
                {children}
            </div>
        </div>
    );
};

export default InfoCard;

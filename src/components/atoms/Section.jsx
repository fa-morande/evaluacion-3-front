import React from "react";
import Text from "./Text";
import "../../styles/components/atoms/section.css";

const Section = ({ title, children, centered = true }) => {
    return (
        <section className={`content-section ${centered ? 'centered' : ''}`}>
            {title && (
                <Text variant="h2" className="section-title">
                    {title}
                </Text>
            )}
            <Text variant="p" className="section-text">
                {children}
            </Text>
        </section>
    );
};

export default Section;

import React from "react";
import InfoCard from "../components/molecules/InfoCard";
import Section from "../components/atoms/Section";


function Nosotros() {
    return (
        <main className="nosotros-page">
            <InfoCard title="Sobre Nosotros">
                <Section>
                    En Morenoshop nos apasiona el bienestar de tus mascotas. Ofrecemos
                    productos de calidad para perros y gatos, pensando siempre en su salud
                    y felicidad.
                </Section>

                <Section title="Nuestra Misión">
                    Brindar productos premium y un servicio confiable para que tu mascota
                    tenga lo mejor.
                </Section>

                <Section title="Nuestro Equipo">
                    Somos un grupo de amantes de los animales dedicados a hacer la vida de
                    tus mascotas más feliz.
                </Section>
            </InfoCard>
        </main>
    );
}

export default Nosotros;
import React, { useState } from "react";
import styled from "styled-components";
import { projects } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content-center;
  position: relative;
  z-index: 1;
  padding: 0 16px;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    active ? theme.primary : theme.card};
  color: ${({ active, theme }) => (active ? "#fff" : theme.text_secondary)};
  font-weight: 600;
  transition: 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
`;

const Projects = ({ openModal, setOpenModal }) => {
  const [activeTab, setActiveTab] = useState("company");

  const filteredProjects = projects.filter(
    (p) => p.type === activeTab
  );

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc style={{ marginBottom: "40px" }}>
          I have worked on a wide range of projects. Adding here some of my good projects.
        </Desc>

        {/* Tabs */}
        <Tabs>
          <TabButton
            active={activeTab === "company"}
            onClick={() => setActiveTab("company")}
          >
            Company Projects
          </TabButton>
          <TabButton
            active={activeTab === "personal"}
            onClick={() => setActiveTab("personal")}
          >
            Personal Projects
          </TabButton>
        </Tabs>

        {/* Project Cards */}
        <CardContainer>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          ))}
        </CardContainer>
      </Wrapper>
    </Container>
  );
};

export default Projects;

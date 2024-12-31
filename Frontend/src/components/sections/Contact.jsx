import React, { useState } from "react";
import styled from "styled-components";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1350px;
  padding: 40px 20px;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 48px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
`;

const ContactForm = styled.form`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  gap: 12px;
`;

const ContactInput = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 8px;
  padding: 10px 12px;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContactTextArea = styled.textarea`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 8px;
  padding: 10px 12px;
  resize: none;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  background: linear-gradient(135deg, #6a5acd, #8a2be2);
  padding: 12px;
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: linear-gradient(135deg, #8a2be2, #6a5acd);
  }
`;

const Feedback = styled.div`
  margin-top: 10px;
  color: ${({ success }) => (success ? "green" : "red")};
  font-size: 14px;
  text-align: center;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    desc: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");
    setLoading(true);
  
    if (!formData.name || !formData.email || !formData.subject || !formData.desc) {
      setFeedback("All fields are required!");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch("https://deepakportfolio-n7vt.onrender.com/api/user/senddata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, 
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setFeedback("Message sent successfully!");
    } catch (err) {
      console.error("Fetch error:", err);
      setFeedback("Failed to send the message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm onSubmit={handleSubmit}>
          <ContactInput
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <ContactInput
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <ContactInput
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <ContactTextArea
            name="desc"
            placeholder="Your Message"
            rows="4"
            value={formData.desc}
            onChange={handleChange}
            required
          />
          <ContactButton type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </ContactButton>
        </ContactForm>
        {feedback && (
          <Feedback success={feedback.includes("successfully")}>
            {feedback}
          </Feedback>
        )}
      </Wrapper>
    </Container>
  );
};

export default Contact;

import React, { useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
`;

const Input = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 8px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const Textarea = styled.textarea`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 8px;
  padding: 12px 16px;
  resize: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const Button = styled.input`
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const Contact = () => {
  const form = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_psby963", // Replace with your actual service ID
          "template_jb46glb", // Replace with your updated template ID
          form.current,
          "dsX8gER4tmz0LnUCU" // Replace with your actual public key
        )
        .then(
          () => {
            alert("Message sent successfully!");
            form.current.reset();
          },
          (error) => {
            console.error("Error sending message:", error);
            alert("Error sending message. Please try again.");
          }
        );
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact Me</Title>
        <Desc>Feel free to reach out for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Your Name"
            name="from_name"
            required
          />
          <Input
            type="email"
            placeholder="Your Email"
            name="email_id"
            required
          />
          <Input
            type="text"
            placeholder="Subject"
            name="subject"
            required
          />
          <Textarea
            placeholder="Your Message"
            name="message"
            rows="5"
            required
          />
          <Button type="submit" value="Send Message" />
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;

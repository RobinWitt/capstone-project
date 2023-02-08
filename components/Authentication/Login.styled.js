import styled from "styled-components";

export const LogForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid var(--background-secondary);
  background-color: var(--background-tiles);
`;

export const FormHeader = styled.h2`
  color: var(--primary);
  margin-bottom: 0.5rem;
`;

export const LogLabel = styled.label`
  text-align: center;
  color: var(--text);
`;

export const LogInput = styled.input`
  width: 80%;
  margin: 0.2rem 0 0.4rem 0;
  line-height: 1.2rem;
`;

export const LogButton = styled.button`
  margin-top: 0.8rem;
  font-size: 1rem;
  padding: 0.2rem 1rem;
  border-radius: 999px;
  border: none;
  background-color: var(--accent);
  color: var(--background);
`;

import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { Button } from "@blueprintjs/core";

import { Block } from "../types";
import Modal from "./Modal";

const Container = styled.div`
  webkit-box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1),
    0 4px 8px rgba(16, 22, 26, 0.2), 0 18px 46px 6px rgba(16, 22, 26, 0.2);
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 4px 8px rgba(16, 22, 26, 0.2),
    0 18px 46px 6px rgba(16, 22, 26, 0.2);
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const HeaderSection = styled.div`
  background: #243b53;
  margin-bottom: 10px;
  padding: 20px 20px;
`;

const HeaderText = styled.h2`
  color: #f0f4f8;
  margin: 0;
`;

const BlockSection = styled.div`
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  background-color: #9fb3c8 !important;
  background-image: none !important;
  box-shadow: none !important;
  color: #102a43 !important;
  font-weight: bold;
  margin: 5px auto;
  padding: 10px;
  text-transform: capitalize;
  width: 80%;
`;

const CreateStyledButton = styled(Button)`
  background-color: #b39afd !important;
  background-image: none !important;
  box-shadow: none !important;
  color: #102a43 !important;
  font-weight: bold;
  margin: 5px auto;
  padding: 10px;
  text-transform: capitalize;
  width: 80%;
`;

const CreateBlockSection = styled.div`
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
`

interface BlockPickerProps {
  addBlock: (blockName: string) => void;
  className?: string;
  blocks: Block[]
}

const BlockPicker: React.FunctionComponent<BlockPickerProps> = ({ addBlock, className, blocks }) => {

  const createBlock = async e => {
    e.preventDefault();
    try {
        
    } catch (error) {
        console.error(error.message);
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Container className={className}>
      <HeaderSection>
        <HeaderText> Add a Block </HeaderText>
        
      </HeaderSection>
      <BlockSection>
        {Object.keys(blocks).map((blockName: string, index: number) => (
          <StyledButton
            data-testid={`block-add-${blocks[index].type}`}
            key={blockName}
            onClick={() => addBlock(blocks[index].type)}
          >
            {blocks[index].type}
          </StyledButton>
        ))}
        <CreateBlockSection>
          <CreateStyledButton onClick={() => setIsOpen(true)}>
            Create New Block
          </CreateStyledButton>
          {isOpen && <Modal setIsOpen={setIsOpen} />}
        </CreateBlockSection>
      </BlockSection>
    </Container>
  );
};

export default BlockPicker;

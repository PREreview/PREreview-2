/* eslint-disable react/prop-types */

import React from 'react'
import ReactModal from 'react-modal'
import styled from 'styled-components'

import { Icon } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'

ReactModal.setAppElement('#root')

/*
  This is to make react modal and styled components play nice
  See https://github.com/styled-components/styled-components/issues/1494#issuecomment-363362709
*/
function ReactModalAdapter({ className, modalClassName, ...props }) {
  return (
    <ReactModal
      className={modalClassName}
      closeTimeoutMS={150}
      portalClassName={className}
      {...props}
    />
  )
}

const StyledModal = styled(ReactModalAdapter).attrs({
  modalClassName: 'Modal',
  overlayClassName: 'Overlay',
})`
  .Overlay {
    background-color: rgba(240, 240, 240, 0.85);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }

  .Modal {
    background: ${th('colorBackground')};
    border: ${th('borderWidth')} ${th('borderStyle')} ${th('colorBorder')};
    bottom: 40px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    left: 40px;
    outline: none;
    overflow: hidden;
    padding: 0;
    position: absolute;
    right: 40px;
    top: 40px;
  }

  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 150ms ease-in-out;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
`

const Header = styled.div`
  /* background-color: blue; */
  box-shadow: 0 0 1px ${th('colorPrimary')};
  font-family: ${th('fontInterface')};
  margin-bottom: 1px;
  padding: ${th('gridUnit')} calc(${th('gridUnit')} * 2);
`

const HeaderText = styled.div`
  color: ${th('colorPrimary')};
  display: inline-block;
  font-size: 18px;
  padding: 8px;
`

const IconWrapper = styled.div`
  float: right;
  padding: 5px;

  &:hover {
    background: ${th('colorBackgroundHue')};
  }
`

const Body = styled.div`
  /* background: maroon; */
  flex-grow: 1;
  overflow: auto;
  padding: calc(${th('gridUnit')} * 2) 0;
`

const Footer = styled.div`
  /* background-color: indianred; */
`

const CloseIcon = props => (
  <IconWrapper>
    <Icon size={2} {...props}>
      x
    </Icon>
  </IconWrapper>
)

const Modal = props => {
  const { children, headerText, onRequestClose, ...rest } = props

  return (
    <StyledModal onRequestClose={onRequestClose} {...rest}>
      <Header>
        <HeaderText>{headerText}</HeaderText>
        <CloseIcon onClick={onRequestClose} />
      </Header>

      <Body>{children}</Body>

      <Footer />
    </StyledModal>
  )
}

export default Modal

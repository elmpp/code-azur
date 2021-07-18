import React, { useRef } from 'react'
import styled from 'styled-components'

interface SliderProps {
  min?: number
  max: number
  value: number
  width?: number
  onChange: (value: number) => void
}


const lowerBackground = (color: string) => `linear-gradient(to bottom, ${color}, ${color}) 100% 50% / 100% 16px no-repeat transparent`;


const StyledInput = styled.input`
  overflow: hidden;
  display: block;
  appearance: none;
  // max-width: 700px;
  width: ${props => props.width ? `${props.width}px` : '100%'};
  margin: 0;
  height: 36px;
  cursor: pointer;
  background-color: transparent;


  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 36px;
    background: ${props => lowerBackground(props.theme.colors.highlight)};
  }

  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: 36px;
    width: 36px;
    background: ${props => props.theme.colors.body};
    border-radius: 100%;
    border: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: background-color 150ms;
  }

  &::-webkit-slider-thumb {
    background-color: ${props => props.theme.colors.secondary};
  }
  &::-moz-range-thumb {
    background-color: ${props => props.theme.colors.secondary};
  }
  &::-ms-thumb {
    background-color: ${props => props.theme.colors.secondary};
  }
`

export const Slider: React.FC<SliderProps> = ({ min=0, max, value, onChange, width }) => {
  const doOnChange = useRef((value: number) => {
    onChange(value)
  })
  return (
    <StyledInput type="range" min={min} max={max} value={value} width={width} onChange={event => doOnChange.current(parseInt(event.target.value, 10)) } />
  )
}

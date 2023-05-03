import React from "react";
import styled from "styled-components";
import { LazyLoadImage  } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function ImageLoader({ src, alt }) {
  return (
      <LazyLoadImage src={src} alt={alt} effect="blur"/>
  );
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

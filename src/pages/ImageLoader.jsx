import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ImageLoader({ src, alt }) {
  return (
    <ImageWrapper>
      <LazyLoadImage src={src} alt={alt} effect="blur" />
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
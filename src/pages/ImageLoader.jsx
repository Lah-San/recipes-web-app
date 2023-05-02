import React from "react";
import LazyLoad from "react-lazyload";
import styled from "styled-components";

export default function ImageLoader({ src, alt }) {
  return (
    <LazyLoad>
      <Image src={src} alt={alt} />
    </LazyLoad>
  );
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
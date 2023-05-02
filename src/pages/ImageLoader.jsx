import React from "react";
import styled from "styled-components";

export default function ImageLoader({ src, alt }) {
  return (
      <Image src={src} alt={alt} />
  );
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
import React from "react";
import styled from "styled-components";
import wallpaper from "../assets/images/wallpaper.png";
import { COLOR_BACKGROUND_BODY, COLOR_WHITE } from "../constants/cts_colors";
import { HEADER_HEIGHT } from "../constants/cts_sizes";

const Wallpaper = () => {
  return (
    <Wrapper>
      <Image src={wallpaper} alt="wallpaper" />
    </Wrapper>
  )
}

export default Wallpaper;

/*//////////////////////////////////////////////////////////////////////////
/////////////////////////////// S T Y L E  /////////////////////////////////
//////////////////////////////////////////////////////////////////////////*/

const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -1 !important;
  background-color: ${COLOR_BACKGROUND_BODY};
`

const Image = styled.img`
  
  width: 100%;
  // ========= MEDIA QUERIES - Image ============
  @media (max-width: 874px) {
    margin-top: ${HEADER_HEIGHT};
  }
`
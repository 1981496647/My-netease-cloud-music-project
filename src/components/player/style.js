import styled from "styled-components";

export const Playercss = styled.div`
  width: 126px;
  height: 100%;
  display: flex;
  align-items: center;
  .volume {
    width: 25px;
    height: 25px;
    background: red;
    cursor: pointer;
    background: url(${(props) => props.playbarImg}) no-repeat -2px -248px;
  }
  .volume:hover {
    background: url(${(props) => props.playbarImg}) no-repeat -31px -248px;
  }
  .circulation {
    width: 25px;
    height: 25px;
    background: red;
    background: url(${(props) => props.playbarImg}) no-repeat;
    background-position: ${(props) => {
      switch (props.indexCurrent) {
        case 0:
          return "-3px -344px";
        case 1:
          return "-66px -248px";
        case 2:
          return "-66px -344px";
        default:
          return "-3px -344px";
      }
    }};
    cursor: pointer;
  }
  .circulation:hover {
    background: url(${(props) => props.playbarImg}) no-repeat;
    background-position: ${(props) => {
      switch (props.indexCurrent) {
        case 0:
          return "-33px -344px";
        case 1:
          return "-93px -248px";
        case 2:
          return "-93px -344px";
        default:
          return "-33px -344px";
      }
    }};
    color: red;
  }
  .playback {
    width: 59px;
    height: 25px;
    background: red;
    cursor: pointer;
    background: url(${(props) => props.playbarImg}) no-repeat -42px -68px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-left:15px;
      font-size: 12px;
      color: #ccc;
    }
  }

  .playback:hover {
    background: url(${(props) => props.playbarImg}) no-repeat -42px -98px;
  }
`;

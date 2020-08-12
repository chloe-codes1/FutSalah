import React, { useEffect, useState } from "react";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import GridList from "@material-ui/core/GridList";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import { Link } from "react-router-dom";
import Paginations from "components/Pagination/Pagination.js";
import axios from "axios";
import bgImage from "assets/img/searchTeam-bg.jpg";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/SearchTeamPage.js";
// import teamImage from "assets/img/basicTeamImg.jpg";
import teamImage from "assets/img/basicTeamImg1.jpg";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(styles);

export default function SearchTeamPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [pageNum, setPageNum] = useState(1);
  const [sido, setSido] = useState("전체");
  const [gu, setGu] = useState("");
  const [sidoList, setSidoList] = useState(["전체"]);
  const [guList, setGuList] = useState([]);

  const [searchWord, setSearchWord] = useState("");
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    // 전체 데이터 받아오기
    // 나중에 페이징되는 데이터 받기로 변경하기
    searchAll();
  }, []);

  // 전체 페이지 수 1로 고정
  const totalPage = 1;

  const makePagination = (pageRow) => {
    const page = [{ text: "PREV", onClick: prePage }];
    for (let i = 1; i < 11; i++) {
      if (pageRow * 10 + i <= totalPage) {
        page.push({
          text: pageRow * 10 + i,
          onClick: () => {
            setPageNum(pageRow * 10 + i);
          },
        });
      }
    }
    page.push({ text: "NEXT", onClick: nextPage });
    return page;
  };

  const prePage = () => {
    if (pageNum !== 1) setPageNum(pageNum - 1);
  };

  const nextPage = () => {
    if (pageNum !== totalPage) setPageNum(pageNum + 1);
  };

  const sidoChange = (event) => {
    // 시도 이름으로 구, locationID 불러오기
    setSido(event.target.value);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/location`,
      data: {
        sido: event.target.value,
      },
    })
      .then((res) => {
        const list = [];
        res.data.map((location) => {
          list.push(location.gu);
        });
        setGuList(list);
        setGu("");
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const guChange = (event) => {
    setGu(event.target.value);
  };

  // 지역 목록 불러오기
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/location`,
    })
      .then((res) => {
        const list = [];
        res.data.map((location) => {
          if (list.find((sido) => sido === location.sido) === undefined)
            list.push(location.sido);
        });
        setSidoList(list);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

  // 팀 전체 검색
  const searchAll = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/team`)
      .then((response) => {
        console.log(response.data);
        setTeamList(response.data);
      })
      .catch(() => {
        console.log("악 실패");
      });
  };

  // 조건 검색
  const searchByCondition = (condition) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/team/search/${condition}`,
      data: {
        name: searchWord,
        gu: gu,
      },
    })
      .then((res) => {
        console.log("search by name success");
        setTeamList(res.data);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  // 검색
  const search = () => {
    let condition;

    if (sido === "전체") {
      // 이름으로만 검색
      searchByCondition("name");
    } else if (gu !== "") {
      if (searchWord === "") {
        searchByCondition("location");
      } else {
        searchByCondition("both");
      }
    } else {
      alert("지역을 끝까지 선택해주세요!");
    }
  };

  return (
    <div>
      <Header
        brand="FutSalah"
        color="transparent"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />

      <div
        className={classes.background}
        style={{
          backgroundImage: "url(" + bgImage + ")",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className={classes.container}>
          <div
            style={{
              zIndex: "2",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <FormControl className={classes.formControl}>
                <Select
                  labelId="sido"
                  id="sido-select"
                  value={sido}
                  onChange={sidoChange}
                  inputProps={{
                    classes: {
                      icon: "white",
                    },
                  }}
                >
                  <MenuItem disabled value="">
                    <em>시도</em>
                  </MenuItem>
                  <MenuItem value="전체">전체</MenuItem>
                  {sidoList.map((s) => (
                    <MenuItem value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="gu"
                  id="gu-select"
                  value={gu}
                  onChange={guChange}
                >
                  <MenuItem disabled value="">
                    <em>시군구</em>
                  </MenuItem>
                  {guList.map((g) => (
                    <MenuItem value={g}>{g}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <input
                type="text"
                style={{ lineHeight: "30px" }}
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }}
              />
              <Button
                color="info"
                size="sm"
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  search();
                }}
              >
                검색
              </Button>
            </div>
          </div>
          <GridList spacing={15} cellHeight="auto" cols={3}>
            {teamList.map((t) =>
              t.name === undefined ? (
                <GridContainer
                  key={t.id}
                  justify="center"
                  style={{ margin: "0 auto" }}
                ></GridContainer>
              ) : (
                <GridContainer
                  key={t.id}
                  justify="center"
                  style={{ margin: "0 auto" }}
                >
                  <GridItem>
                    <Card>
                      <CardHeader className={classes.cardHeader}>
                        <GridItem
                          style={{
                            position: "relative",
                            paddingTop: "100%",
                            overflow: "hidden",
                            width: "100%",
                            height: "auto",
                          }}
                        >
                          <img
                            src={teamImage}
                            alt="..."
                            style={{
                              borderRadius: "70%",
                              position: "absolute",
                              top: "0",
                              left: "0",
                              right: "0",
                              bottom: "0",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </GridItem>
                      </CardHeader>
                      <CardBody className={classes.cardBody}>
                        <h3
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                          }}
                        >
                          <strong>{t.name}</strong>
                        </h3>
                        <h4>
                          {t.wins}승 {t.defeats}패 {t.draws}무
                        </h4>
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Link to={`/teaminfo/${t.teamID}`}>
                          <Button color="success" size="lg">
                            팀 정보
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </GridItem>
                </GridContainer>
              )
            )}
          </GridList>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "2",
              position: "relative",
              margin: "20vh auto",
            }}
          >
            <Paginations
              pages={makePagination(parseInt(pageNum / 11))}
              color="info"
              selected={pageNum}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

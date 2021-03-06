import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../../src/lib/AluraCommons";
import MainGrid from "../../src/components/MainGrid";
import Box from "../../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../../src/components/ProfileRelations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const [user, setUser] = useState("");
  const [githubFollowing, setGithubFollowing] = useState([]);
  const [githubUser, setGithubUser] = useState("");
  const [initialValue, setInitialValue] = useState(0);
  const [lastValue, setLastValue] = useState(6);
  const [page, setPage] = useState(1);
  const perPage = 6;
  const totalPage = Math.ceil(githubFollowing.length / perPage);
  const router = useRouter();

  console.log(router);

  const gitUser = router.query.name

  useEffect(() => {
    const gitUser = router.query.name;
    setGithubUser(gitUser);
  }, [router]);

  function nextPage() {
    if (page < totalPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      const start = page * perPage;
      const end = start + perPage;
      setInitialValue(start);
      setLastValue(end);
    }
  }

  function prevPage() {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      const start = prevPage * perPage;
      const end = start - perPage;
      setInitialValue(end);
      setLastValue(start);
    }
  }
  // const githubUser = query.name;

  useEffect(() => {
    console.log(githubUser)
    console.log(gitUser)
    fetch(`https://api.github.com/users/${gitUser}/following`)
      .then((userFollow) => {
        return userFollow.json();
      })
      .then((response) => {
        setGithubFollowing(response);
      });
  }, [router]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}`)
      .then((user) => {
        return user.json();
      })
      .then((response) => {
        setUser(response.name);
      });
  }, [router]);

    return (
      <div>
        <AlurakutMenu githubUser={githubUser} />
        <MainGrid>
          <div className="profileArea" style={{ gridArea: "profileArea" }}>
            <Box>
              <img
                src={`https://github.com/${githubUser}.png`}
                alt="Foto do perfil"
              />
              <hr />
              <p>
                <a
                  className="boxLink"
                  href={`https://github.com/${githubUser}`}
                >
                  @{githubUser}
                </a>
              </p>
              <hr />
              <AlurakutProfileSidebarMenuDefault />
            </Box>
          </div>
          <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
            <Box>
              <h1 className="title">{user}</h1>
              <OrkutNostalgicIconSet key={`_${user}`} />
              <p style={{ paddingTop: "20px", fontWeight: "bold" }}>
                Visualiza????es do perfil:
              </p>
              <div style={{ color: "#5A5A5A" }}>
                <p>Total: 0, ??ltima semana: 0, Ontem: 0</p>
              </div>
            </Box>
          </div>
          <div
            className="profileRelationArea"
            style={{ gridArea: "profileRelationArea" }}
          >
            <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Seguindo ({githubFollowing.length})
              </h2>
              <ul>
                {githubFollowing
                  .slice(initialValue, lastValue)
                  .map((following) => (
                    <li key={following.id}>
                      <a href={`/users/${following.login}`}>
                        <img
                          src={`https://github.com/${following.login}.png`}
                          alt={`Foto de perfil do ${following}`}
                        />
                        <span>{following.login}</span>
                      </a>
                    </li>
                  ))}
              </ul>
              <nav
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingTop: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <a onClick={prevPage} style={{ paddingRight: "10px" }}>
                    <FontAwesomeIcon icon={faAngleLeft} size={"lg"} />
                  </a>
                  <a
                    style={{
                      fontSize: "18px",
                      paddingRight: "13px",
                      pointerEvents: "none",
                    }}
                  >
                    {page}
                  </a>
                  <a onClick={nextPage}>
                    {" "}
                    <FontAwesomeIcon icon={faAngleRight} size={"lg"} />
                  </a>
                </div>
              </nav>
            </ProfileRelationsBoxWrapper>
          </div>
        </MainGrid>
      </div>
    );
  }

import jwt_decode from "jwt-decode";
import nookies from "nookies";
import React, { useEffect, useState } from "react";
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AluraCommons";

export default function Home(props) {
  const [user, setUser] = useState("");
  const [communities, setCommunities] = useState([]);
  const githubUser = props.githubUser;
  const [githubFollowers, setGithubFollowers] = useState([]);
  const [githubFollowing, setGithubFollowing] = useState([]);

  //pagination
  const [initialValue, setInitialValue] = useState(0);
  const [lastValue, setLastValue] = useState(6);
  const [page, setPage] = useState(1);
  const perPage = 6;
  const totalPage = Math.ceil(githubFollowing.length / perPage);

  function nextPage() {
    if (page < totalPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      const start = page  * perPage;
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

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/following`)
      .then((userFollow) => {
        // console.log(userFollow.json());
        return userFollow.json();
      })
      .then((response) => {
        console.log(response);
        setGithubFollowing(response);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}`)
      .then((user) => {
        return user.json();
      })
      .then((response) => {
        setUser(response.name);
      });
  }, []);

  useEffect(() => {
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "e933a2748d46adf0f08cca459b9481",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
        allCommunities(filter: {creatorSlug: {eq: ${githubUser}}}) {
          title 
          id
          imageUrl
          address
          creatorSlug
        }
      }`,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        const communities = result.data.allCommunities;
        setCommunities(communities);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get("title");
    const imageUrl = formData.get("image");
    const address = formData.get("address");

    const community = {
      title,
      imageUrl,
      address,
      creatorSlug: githubUser.toLowerCase(),
    };

    fetch("/api/communities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(community),
    }).then(async (response) => {
      const communityCreated = await response.json();
      const currentCommunities = [...communities, communityCreated];

      setCommunities(currentCommunities);

      event.target.reset();
    });
  }
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
              <a className="boxLink" href={`https://github.com/${githubUser}`}>
                @{githubUser}
              </a>
            </p>
            <hr />
            <AlurakutProfileSidebarMenuDefault />
          </Box>
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem-Vindo(a), {user}</h1>
            <OrkutNostalgicIconSet />
            <p style={{ paddingTop: "20px", fontWeight: "bold" }}>
              Visualizações do perfil:
            </p>
            <div style={{ color: "#5A5A5A" }}>
              <p>Total: 0, Última semana: 0, Ontem: 0</p>
            </div>
            <p style={{ paddingTop: "20px", fontWeight: "bold" }}>
              Sorte de hoje:
            </p>
            <p style={{ color: "#5A5A5A" }}>
              Você participou da Imersão Alura.
            </p>
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Qual vai ser o foto da sua comunidade?"
                  name="image"
                  aria-label="Qual vai ser o foto da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Qual o endereço da sua comunidade?"
                  name="address"
                  aria-label="Qual o endereço da sua comunidade?"
                />
              </div>
              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationArea"
          style={{ gridArea: "profileRelationArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Seguindo ({githubFollowing.length})</h2>
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
                  {"<"}
                </a>
                <a style={{ paddingRight: "15px", pointerEvents: "none" }}>
                  {page}
                </a>
                <a onClick={nextPage}> {">"} </a>
              </div>
            </nav>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({communities.length})</h2>
            <ul>
              {communities.map((community) => (
                <li key={community.id}>
                  <a href={`/communities/${community.title}`}>
                    <img
                      src={community.imageUrl}
                      alt={`Foto de perfil do ${community.image}`}
                    />

                    <span>
                      <a
                        href={community.address}
                        target="_blank"
                        style={{
                          height: "15px",
                          textDecoration: "none",
                          color: "white",
                          zIndex: "2",
                        }}
                      >
                        {" "}
                        {community.title}
                      </a>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </div>
  );
}

export async function getServerSideProps(context) {
  const token = nookies.get(context).USER_TOKEN;

  const { isAuthenticated } = await fetch(
    "http://alurakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((response) => response.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { githubUser } = jwt_decode(token);
  console.log(githubUser);

  return {
    props: {
      githubUser,
    },
  };
}

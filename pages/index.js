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
  const githubFriends = [
    "omariosouto",
    "juunegreiros",
    "marcobrunodev",
    "filipedeschamps",
    "diego3g",
  ];

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
        console.log(communities);
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
      creatorSlug: githubUser,
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
            <h2 className="smallTitle">Amigos ({githubFriends.length})</h2>
            <ul>
              {githubFriends.map((friend) => (
                <li key={friend}>
                  <a href={`/users/${friend}`}>
                    <img
                      src={`https://github.com/${friend}.png`}
                      alt={`Foto de perfil do ${friend}`}
                    />
                    <span>{friend}</span>
                  </a>
                </li>
              ))}
            </ul>
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

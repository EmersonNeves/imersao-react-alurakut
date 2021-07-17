import React, { useState } from "react";
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AluraCommons";

export default function Home() {
  const [communities, setCommunities] = useState([]);
  const githubName = "EmersonNeves";
  const githubFriends = [
    "omariosouto",
    "juunegreiros",
    "marcobrunodev",
    "filipedeschamps",
    "diego3g",
  ];

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get("title");
    const image = formData.get("image");

    const community = {
      id: new Date().toISOString,
      title,
      image,
    };

    const currentCommunities = [...communities, community];

    setCommunities(currentCommunities);

    event.target.reset();
  }
  return (
    <div>
      <AlurakutMenu githubUser={githubName} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <Box>
            <img
              src={`https://github.com/${githubName}.png`}
              alt="Foto do perfil"
            />
            <hr />
            <p>
              <a className="boxLink" href={`https://github.com/${githubName}`}>
                @{githubName}
              </a>
            </p>
            <hr />
            <AlurakutProfileSidebarMenuDefault />
          </Box>
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem-Vindo(a)</h1>
            <OrkutNostalgicIconSet />
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
              <button>Cria Comunidade</button>
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
                      src={community.image}
                      alt={`Foto de perfil do ${community.image}`}
                    />
                    <span>{community.title}</span>
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

import type { Leaderboard } from "api";

export const MOCK_LEADERBOARD: Leaderboard = {
  runs: [
    {
      place: 1,
      run: {
        id: "mex1j90z",
        category: "r02q8y2y",
        comment: null,
        date: "2019-10-18",
        game: "9j1l7vdg",
        level: null,
        times: { primary: "PT1H7M46S", primary_t: 4066 },
        players: [
          {
            rel: "guest",
            uri: "https://www.speedrun.com/api/v1/users/e8e2og78",
            name: "expireddata",
          },
        ],
        weblink: "",
        videos: { links: [{ uri: "" }] },
      },
    },
    {
      place: 2,
      run: {
        id: "2ywwod0y",
        category: "r02q8y2y",
        comment: null,
        date: "2016-11-04",
        game: "9j1l7vdg",
        level: null,
        times: { primary: "PT1H13M52S", primary_t: 4432 },
        players: [
          {
            rel: "user",
            uri: "https://www.speedrun.com/api/v1/users/eo86wqxz",
            id: "eo86wqxz",
          },
        ],
        weblink: "",
        videos: { links: [{ uri: "" }] },
      },
    },
    {
      place: 3,
      run: {
        id: "kz5v0djm",
        category: "r02q8y2y",
        comment: null,
        date: "2016-01-05",
        game: "9j1l7vdg",
        level: null,
        times: { primary: "PT1H14M53S", primary_t: 4493 },
        players: [
          {
            rel: "user",
            uri: "https://www.speedrun.com/api/v1/users/18vlkvxl",
            id: "18vlkvxl",
          },
        ],
        weblink: "",
        videos: { links: [{ uri: "" }] },
      },
    },
  ],
  players: {
    data: [
      {
        name: "expireddata",
        rel: "guest",
        uri: "https://www.speedrun.com/user/ExpiredData",
      },
      {
        id: "eo86wqxz",
        names: { international: "Mattie", japanese: null },
        weblink: "https://www.speedrun.com/user/Mattie",
      },
      {
        id: "18vlkvxl",
        names: { international: "Zockende_Socke", japanese: null },
        weblink: "https://www.speedrun.com/user/Zockende_Socke",
      },
      {
        id: "48grmrxp",
        names: { international: "Saiyanz", japanese: null },
        weblink: "https://www.speedrun.com/user/Saiyanz",
      },
      {
        id: "y8dkkoj6",
        names: { international: "tridenttail", japanese: null },
        weblink: "https://www.speedrun.com/user/tridenttail",
      },
      {
        id: "xko1o078",
        names: { international: "Jw_08", japanese: null },
        weblink: "https://www.speedrun.com/user/Jw_08",
      },
      {
        id: "qxk43mmj",
        names: { international: "inhalethistruth", japanese: null },
        weblink: "https://www.speedrun.com/user/inhalethistruth",
      },
      {
        id: "kj9v5rx4",
        names: { international: "LishousTV", japanese: null },
        weblink: "https://www.speedrun.com/user/LishousTV",
      },
      {
        id: "0jmpwoj1",
        names: { international: "Coombs68", japanese: null },
        weblink: "https://www.speedrun.com/user/Coombs68",
      },
      {
        id: "pj0devrx",
        names: { international: "King_Theonitus", japanese: null },
        weblink: "https://www.speedrun.com/user/King_Theonitus",
      },
    ],
  },
};

export const ERROR_LEADERBOARD: Leaderboard = {
  ...MOCK_LEADERBOARD,
  players: {
    data: [],
  },
};

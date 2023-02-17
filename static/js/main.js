import Chart from "chart.js/auto";
import { CubejsApi } from "@cubejs-client/core";

const apiUrl =
  "https://heavy-lansford.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1";
const cubeToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEwMDAwMDAwMDAsImV4cCI6NTAwMDAwMDAwMH0.OHZOpOBVKr-sCwn8sbZ5UFsqI3uCs6e4omT7P6WVMFw";

const cubeApi = new CubejsApi(cubeToken, { apiUrl });

export async function getAquisitionsByYear() {
  const acquisitionsByYearQuery = {
    dimensions: ["Artworks.yearAcquired"],
    measures: ["Artworks.count"],
    filters: [
      {
        member: "Artworks.yearAcquired",
        operator: "set",
      },
    ],
    order: {
      "Artworks.yearAcquired": "asc",
    },
  };

  const resultSet = await cubeApi.load(acquisitionsByYearQuery);

  return resultSet.tablePivot().map((row) => ({
    year: parseInt(row["Artworks.yearAcquired"]),
    count: parseInt(row["Artworks.count"]),
  }));
}

export async function getDimensions() {
  const dimensionsQuery = {
    dimensions: ["Artworks.widthCm", "Artworks.heightCm"],
    measures: ["Artworks.count"],
    filters: [
      {
        member: "Artworks.classification",
        operator: "equals",
        values: ["Painting"],
      },
      {
        member: "Artworks.widthCm",
        operator: "set",
      },
      {
        member: "Artworks.widthCm",
        operator: "lt",
        values: ["500"],
      },
      {
        member: "Artworks.heightCm",
        operator: "set",
      },
      {
        member: "Artworks.heightCm",
        operator: "lt",
        values: ["500"],
      },
    ],
  };

  const resultSet = await cubeApi.load(dimensionsQuery);

  return resultSet.tablePivot().map((row) => ({
    width: parseInt(row["Artworks.widthCm"]),
    height: parseInt(row["Artworks.heightCm"]),
    count: parseInt(row["Artworks.count"]),
  }));
}

cubeApi.load().then(() => {
  this.getAquisitionsByYear();
  this.getDimensions();
});

(async function () {
  const data = await getAquisitionsByYear();

  new Chart(document.getElementById("acquisitions"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Acquisitions by year",
          data: data.map((row) => row.count),
        },
      ],
    },
  });
})();

(async function () {
  const data = await getDimensions();

  new Chart(document.getElementById("dimensions"), {
    type: "bubble",
    options: {
      aspectRatio: 1,
      scales: {
        x: {
          max: 500,
        },
        y: {
          max: 500,
        },
      },
    },
    data: {
      labels: data.map((x) => x.year),
      datasets: [
        {
          label: "Dimensions",
          data: data.map((row) => ({
            x: row.width,
            y: row.height,
            r: row.count,
          })),
        },
      ],
    },
  });
})();

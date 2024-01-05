import { Message } from "primereact/message";
import { Divider } from "primereact/divider";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Panel } from "primereact/panel";

const links = [
  { label: "New Mexico Water Data", url: "https://newmexicowaterdata.org" },
  {
    label: "New Mexico Water Data Catalog",
    url: "https://catalog.newmexicowaterdata.org",
  },
  {
    label: "New Mexico Water Data Developer Docs",
    url: "https://developer.newmexicowaterdata.org",
  },
  {
    label: "USGS National Water Information System",
    url: "https://waterdata.usgs.gov/nwis",
  },
  {
    label: "National Water Dashboard",
    url: "https://dashboard.waterdata.usgs.gov/app/nwd/en/?region=lower48&aoi=default",
  },
  {
    label: "New Mexico Current Conditions",
    url: "https://waterdata.usgs.gov/nm/nwis/rt",
  },
  {
    label: "New Mexico Daily Values",
    url: "https://waterdata.usgs.gov/nm/nwis/uv",
  },
  {
    label: "New Mexico Groundwater Levels",
    url: "https://waterdata.usgs.gov/nm/nwis/gw",
  },
  {
    label: "New Mexico Streamflow",
    url: "https://waterdata.usgs.gov/nm/nwis/measurement",
  },
];

const nodes = [
  {
    key: 0,
    data: {
      label: "New Mexico Water Data",
      url: "https://newmexicowaterdata.org",
    },
    children: [
      {
        key: 1,
        data: {
          label: "Data Catalog",
          url: "https://catalog.newmexicowaterdata.org",
        },
      },
      {
        key: 2,
        data: {
          label: "Developer Docs",
          url: "https://developer.newmexicowaterdata.org",
        },
      },
    ],
  },
  {
    key: 3,
    data: {
      label: "USGS National Water Information System",
      url: "https://waterdata.usgs.gov/nwis",
    },
    children: [
      {
        key: 4,
        data: {
          label: "National Water Dashboard",
          url: "https://dashboard.waterdata.usgs.gov/app/nwd/en/?region=lower48&aoi=default",
        },
      },
      {
        key: 5,
        data: {
          label: "New Mexico Current Conditions",
          url: "https://waterdata.usgs.gov/nm/nwis/rt",
        },
      },
      {
        key: 6,
        data: {
          label: "New Mexico Daily Values",
          url: "https://waterdata.usgs.gov/nm/nwis/uv",
        },
      },
      {
        key: 7,
        data: {
          label: "New Mexico Groundwater Levels",
          url: "https://waterdata.usgs.gov/nm/nwis/gw",
        },
      },
      {
        key: 8,
        data: {
          label: "New Mexico Streamflow",
          url: "https://waterdata.usgs.gov/nm/nwis/measurement",
        },
      },
    ],
  },
];

export default function Documentation() {
  const linkTemplate = (node) => {
    return (
      <a href={node.data.url} target="_blank" rel="noreferrer">
        {node.data.label}
      </a>
    );
  };

  return (
    <div>
      <Message text={"More Documentation coming soon"} severity={"info"} />

      <Panel header={"How to use Beaver"}>
        Beaver is a tool for exploring and visualizing water data in New Mexico.
        It is designed to be easy to use, and to provide a consistent experience
        across different types of data. Beaver is currently in development, and
        we are working on adding new features and data types. If you have any
        questions or comments, please send us an
        <a href="mailto:rachel.hobbs@nmt.edu"> email</a>.
      </Panel>

      {/*<Divider />*/}

      <Panel header={"Links"}>
        The following is a list of links to documentation and other resources.
        <TreeTable value={nodes}>
          {/*<Column field="label" header="Label" expander></Column>*/}
          <Column expander field="url" body={linkTemplate}></Column>
        </TreeTable>
      </Panel>
    </div>
  );
}

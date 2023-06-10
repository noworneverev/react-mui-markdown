import {
  Alert,
  Box,
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coy,
  dark,
  funky,
  okaidia,
  solarizedlight,
  tomorrow,
  twilight,
  prism,
  a11yDark,
  atomDark,
  base16AteliersulphurpoolLight,
  cb,
  coldarkCold,
  coldarkDark,
  darcula,
  dracula,
  duotoneDark,
  duotoneEarth,
  duotoneForest,
  duotoneLight,
  duotoneSea,
  duotoneSpace,
  ghcolors,
  gruvboxDark,
  gruvboxLight,
  hopscotch,
  materialDark,
  materialLight,
  materialOceanic,
  nord,
  oneDark,
  oneLight,
  pojoaque,
  shadesOfPurple,
  synthwave84,
  vs,
  vscDarkPlus,
  xonokai,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useTheme } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface Props {
  path?: string;
  children?: string;
  theme?: "light" | "dark";
  codeTheme?: "light" | "dark";
  style?: string;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function MarkdownLink(props: any) {
  return (
    <Link href={props.href} target="_blank" underline="hover">
      {props.children}
    </Link>
  );
}

function MarkdownTable(props: { children: ReactNode }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        {props.children}
      </Table>
    </TableContainer>
  );
}

function MarkdownTableCell(props: any): ReactElement {
  if (props.style && props.style.textAlign === "right") {
    return (
      <StyledTableCell sx={{ textAlign: "right" }}>
        {props.children}
      </StyledTableCell>
    );
  } else {
    return <StyledTableCell>{props.children}</StyledTableCell>;
  }
}

function MarkdownTableRow(props: { children: ReactNode }) {
  return <StyledTableRow>{props.children}</StyledTableRow>;
}

function getStyle(props: any, isDarkMode: boolean) {
  // if code theme is specified, use it
  if (props.codeTheme && props.codeTheme === "dark") {
    isDarkMode = true;
  } else if (props.codeTheme && props.codeTheme === "light") {
    isDarkMode = false;
  }
  let style = props.style;
  if (style) {
    if (style === "coy") return coy;
    if (style === "dark") return dark;
    if (style === "funky") return funky;
    if (style === "okaidia") return okaidia;
    if (style === "solarizedlight") return solarizedlight;
    if (style === "tomorrow") return tomorrow;
    if (style === "twilight") return twilight;
    if (style === "prism") return prism;
    if (style === "a11yDark") return a11yDark;
    if (style === "atomDark") return atomDark;
    if (style === "base16AteliersulphurpoolLight")
      return base16AteliersulphurpoolLight;
    if (style === "cb") return cb;
    if (style === "coldarkCold") return coldarkCold;
    if (style === "coldarkDark") return coldarkDark;
    if (style === "darcula") return darcula;
    if (style === "dracula") return dracula;
    if (style === "duotoneDark") return duotoneDark;
    if (style === "duotoneEarth") return duotoneEarth;
    if (style === "duotoneForest") return duotoneForest;
    if (style === "duotoneLight") return duotoneLight;
    if (style === "duotoneSea") return duotoneSea;
    if (style === "duotoneSpace") return duotoneSpace;
    if (style === "ghcolors") return ghcolors;
    if (style === "gruvboxDark") return gruvboxDark;
    if (style === "gruvboxLight") return gruvboxLight;
    if (style === "hopscotch") return hopscotch;
    if (style === "materialDark") return materialDark;
    if (style === "materialLight") return materialLight;
    if (style === "materialOceanic") return materialOceanic;
    if (style === "nord") return nord;
    if (style === "oneDark") return oneDark;
    if (style === "oneLight") return oneLight;
    if (style === "pojoaque") return pojoaque;
    if (style === "shadesOfPurple") return shadesOfPurple;
    if (style === "synthwave84") return synthwave84;
    if (style === "vs") return vs;
    if (style === "vscDarkPlus") return vscDarkPlus;
    if (style === "xonokai") return xonokai;
  } else {
    return isDarkMode ? materialDark : materialLight;
  }
}

function MarkdownCode(props: any): ReactElement {
  const theme = useTheme();
  let isDarkMode = theme.palette.mode === "dark";
  // if style is specified, use it
  let style = getStyle(props, isDarkMode);

  if (props.inline) {
    return <Chip size="small" label={props.children?.toString()} />;
  } else if (props.className) {
    const language = props.className.split("-")[1];
    return (
      <SyntaxHighlighter
        language={language}
        style={style}
        PreTag="div"
        showLineNumbers={true}
      >
        {props.children.toString().trim()}
      </SyntaxHighlighter>
    );
  } else {
    return (
      <SyntaxHighlighter style={style} PreTag="div">
        {props.children}
      </SyntaxHighlighter>
    );
  }
}

function MarkdownDivider() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <>
      {isDarkMode ? (
        <Divider sx={{ bgcolor: "#393939" }} />
      ) : (
        <Divider sx={{ bgcolor: "#eeeeee" }} />
      )}
    </>
  );
}

function MarkdownH1(props: { children: ReactNode }) {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontSize: "2em",
          display: "block",
          marginBlockStart: "0.67em",
          marginBlockEnd: "0.3em",
          fontWeight: "bold",
          lineHeight: 1.25,
        }}
      >
        {props.children}
      </Typography>
      <MarkdownDivider />
    </>
  );
}

function MarkdownH2(props: { children: ReactNode }) {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: "1.5em",
          display: "block",
          marginBlockStart: "0.83em",
          marginBlockEnd: "0.3em",
          fontWeight: "bold",
          lineHeight: 1.25,
        }}
      >
        {props.children}
      </Typography>
      <MarkdownDivider />
    </>
  );
}

function MarkdownBlockquote(props: any): ReactElement {
  return (
    <Box sx={{ borderLeft: 3, borderColor: "#eeeeee" }}>
      <blockquote>{props.children}</blockquote>
    </Box>
  );
}

// function MarkdownCheckbox(props: any) {
//   let checked = props.checked;
//   if (checked) {
//     return (
//       <FormControlLabel
//         disabled
//         control={<Checkbox defaultChecked />}
//         label={props.label}
//       />
//     );
//   } else {
//     return (
//       <FormControlLabel disabled control={<Checkbox />} label={props.label} />
//     );
//   }
// }

// function MarkdownImage(props: any) {
//   return <img src={props.src} alt={props.alt} />;
// }

function MarkdownParagraph(props: any): ReactElement {
  const keyToCheck = "$$typeof";
  const exists = props.children.some(
    (obj: { hasOwnProperty: (arg0: string) => any }) =>
      obj.hasOwnProperty(keyToCheck)
  );

  const isWarning =
    typeof props.children[0] === "string" &&
    props.children[0].includes(":::") &&
    props.children.slice(-1)[0].includes(":::");

  if (isWarning) {
    const severity = props.children[0].split(" ")[1];
    return (
      <Box
        sx={{
          display: "block",
          marginBlockStart: "1em",
          marginBlockEnd: "1em",
          marginInlineStart: "0px",
          marginInlineEnd: "0px",
        }}
      >
        <Alert severity={severity}>{props.children.slice(2, -1)}</Alert>
      </Box>
    );
  }
  if (exists) {
    return (
      <Box
        sx={{
          display: "block",
          marginBlockStart: "1em",
          marginBlockEnd: "1em",
          marginInlineStart: "0px",
          marginInlineEnd: "0px",
        }}
      >
        {props.children}
      </Box>
    );
  }
  return <p>{props.children}</p>;
}

export default function MuiMarkdown({
  path,
  children,
  theme,
  codeTheme,
  style,
}: Props) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (children) {
      setContent(children);
      return;
    } else if (path) {
      fetch(path)
        .then((res) => res.text())
        .then((text) => setContent(text));
    }
  }, [path, children]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container>
        <ReactMarkdown
          children={content}
          components={{
            // code: MarkdownCode,
            code: ({ node, ...props }) => (
              <MarkdownCode codeTheme={codeTheme} style={style} {...props} />
            ),
            a: MarkdownLink,
            p: MarkdownParagraph,
            table: MarkdownTable,
            thead: TableHead,
            tbody: TableBody,
            th: MarkdownTableCell,
            tr: MarkdownTableRow,
            td: MarkdownTableCell,
            tfoot: TableFooter,
            h1: MarkdownH1,
            h2: MarkdownH2,
            hr: MarkdownDivider,
            // br: MarkdownBr,
            // input: MarkdownCheckbox,
            // img: MarkdownImage,
            blockquote: MarkdownBlockquote,
          }}
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeRaw]}
        />
      </Container>
    </ThemeProvider>
  );
}

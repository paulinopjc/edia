import { Logs as LogType } from "@typedefs/logs";
import { FC, useEffect, useState } from "react";
import NextIcon from "@mui/icons-material/NavigateNextOutlined";
import PrevIcon from "@mui/icons-material/NavigateBeforeOutlined";
import { Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";

interface IPagination {
  data: any[];
  dataIndexed: {
    data: any[];
    page: number;
    offset: number;
  };
  setDataIndexed: (dataIndexed: any) => void;
}

const Pagination: FC<IPagination> = ({ data, dataIndexed, setDataIndexed }) => {
  const perPage = [
    { label: "5 / page", value: 5 },
    { label: "10 / page", value: 10 },
    { label: "20 / page", value: 20 },
  ];

  const [hasNext, setHasNext] = useState((dataIndexed.page + 1) * dataIndexed.offset < data.length);
  const [isPrevDisabled, setIsPrevDisabled] = useState(dataIndexed.page == 0 ? true : false);

  const paginatorNext = () => {
    const { page, offset } = dataIndexed;
    const truePage = page * offset;
    const pageOffset = (page + 1) * offset;
    const hasMorePages = pageOffset < data.length;

    if (hasMorePages && page < Math.ceil(data.length / offset) - 1) {
      setDataIndexed({ ...dataIndexed, data: data.slice(truePage + offset, pageOffset + offset), page: page + 1 });
      setHasNext(true);
      setIsPrevDisabled(false);
    } else {
      setHasNext(false);
    }
  };

  const paginatorPrev = () => {
    const { page, offset } = dataIndexed;
    const truePage = (page - 1) * offset;
    const pageOffset = page * offset;

    if (truePage >= 0) {
      setDataIndexed({ ...dataIndexed, data: data.slice(truePage, pageOffset), page: page - 1 });
      setHasNext(true);
      setIsPrevDisabled(false);
    } else {
      setIsPrevDisabled(true);
    }
  };

  const offsetChanger = (count: number) => {
    if (count) {
      const newPage = Math.ceil((dataIndexed.page * dataIndexed.offset) / count);
      const newOffset = count;
      const newData = data.slice(newPage * newOffset, (newPage + 1) * newOffset);
      setDataIndexed({ ...dataIndexed, data: newData, offset: newOffset, page: newPage });
    }
  };

  return (
    <Grid
      container
      sx={{
        bottom: 0,
        margin: 0,
        padding: "10px",
        backgroundColor: "white",
      }}
      justifyContent="flex-end"
    >
      <Grid item>
        <Button data-testid="page-prev" sx={{ marginTop: 1 }} disabled={isPrevDisabled} onClick={paginatorPrev}>
          <PrevIcon />
        </Button>
      </Grid>
      <Grid item>
        <Typography data-testid="page-indicator" sx={{ fontSize: 15 }} marginTop={2}>{`Page: ${dataIndexed.page + 1}`}</Typography>
      </Grid>
      <Grid item>
        <Button data-testid="page-next" sx={{ marginTop: 1 }} disabled={!hasNext} onClick={paginatorNext}>
          <NextIcon />
        </Button>
      </Grid>
      <Grid item>
        <Select key="pagination" value={dataIndexed.offset} SelectDisplayProps={{ style: { height: 5 } }} onChange={(e) => offsetChanger(+e.target.value)}>
          {perPage.map((e: { label: string; value: number }) => (
            <MenuItem key={`page-${e.value}`} value={e.value}>
              {e.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default Pagination;

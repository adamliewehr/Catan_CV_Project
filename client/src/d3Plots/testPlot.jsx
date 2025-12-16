import { useMemo } from "react";
import * as d3 from "d3";

const BUCKET_PADDING = 4;

function Histogram({ width, height, data }) {
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([2, 12])
      .range([10, width - 10]);
  }, [data, width]);

  const buckets = useMemo(() => {
    const bucketGenerator = d3
      .bin()
      .value((d) => d)
      .domain([2, 12])
      .thresholds([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    return bucketGenerator(data);
  }, [xScale]);

  const yScale = useMemo(() => {
    const max = Math.max(...buckets.map((bucket) => bucket?.length));
    return d3.scaleLinear().range([height, 0]).domain([0, max]);
  }, [data, height]);

  const allRects = buckets.map((bucket, i) => {
    if (bucket.x0 == undefined || bucket.x1 == undefined) {
      return null;
    }
    return (
      <rect
        key={i}
        fill='#d8b75eff'
        stroke='white'
        x={xScale(bucket.x0) + BUCKET_PADDING / 2}
        width={xScale(bucket.x1) - xScale(bucket.x0) - BUCKET_PADDING}
        y={yScale(bucket.length)}
        height={height - yScale(bucket.length)}
      />
    );
  });

  return (
    <svg width={width} height={height}>
      {allRects}
    </svg>
  );
}

export default Histogram;

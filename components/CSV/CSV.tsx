import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";

export default function CSV(props: any) {
  if (!props.courses) return null;
  const courses = props.courses;
  const csvData = [
    ["title", "description", "teacher"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];
  return (
    <CSVLink data={csvData}>Download CSV</CSVLink>
    )
}
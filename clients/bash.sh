#!/bin/bash
for i in {1..5}
do
  node ../index.js $i
  sleep 5
done
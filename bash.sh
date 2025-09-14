#!/bin/bash

# Цикл от 1 до 10
for i in {1..10}
do
  echo "Запуск #$i"
  node index.js $i "https://rozetka.com.ua/ua/nozhi-kuhonnie/c4626670"
done
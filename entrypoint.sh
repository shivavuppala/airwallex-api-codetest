
#!/usr/bin/env bash

RUN ["chmod", "+x", "/usr/src/app/entrypoint.sh"]

case $1 in
  "run")
    npm start
    ;;
  *)
    echo "usage: $0 [run]"
    exit 1
    ;;
esac

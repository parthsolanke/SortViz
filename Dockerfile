FROM golang:1.23-alpine AS builder

RUN apk add --no-cache make

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux make build

FROM alpine:latest

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=builder /app/bin/sortviz.exe .

COPY --from=builder /app/web ./web

EXPOSE 8080

CMD ["./sortviz.exe"]

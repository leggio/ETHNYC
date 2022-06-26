FROM golang:1.18 AS builder
WORKDIR /build
COPY go.mod .
# COPY go.sum .
# RUN go mod download
COPY main.go .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o feserver .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=builder ./build/feserver .
COPY ./client/dist ./client/dist
EXPOSE 3000
ENTRYPOINT ["./feserver"]

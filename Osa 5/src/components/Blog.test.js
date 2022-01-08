import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Blog from "./Blog"

test("renders content", () => {
  const blog = {
    title : "test blog",
    author : "Me",
    url : "notaurl",
    likes:0
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    "test blog"
  )
  expect(component.container).toHaveTextContent(
    "Me"
  )
})
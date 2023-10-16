library(shiny)

shinyUI(fluidPage(
  titlePanel("My Shiny App"),
  sidebarLayout(
    sidebarPanel(
      textInput("text_input", "Name"),
      actionButton("submit_button", "Submit")
    ),
    mainPanel(
      verbatimTextOutput("output_text")
    )
  )
))

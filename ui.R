library(shiny)

shinyUI(fluidPage(
  titlePanel("Select Stat and Position"),
  
  #uiOutput("select_dropdown"),
  sidebarPanel(
    uiOutput("stat"),
    uiOutput("position")
  ),
  mainPanel(
    plotOutput("barplot")
  )
))

library(shiny)

shinyServer(function(input, output) {
  observeEvent(input$submit_button, {
    output$output_text <- renderText({
      paste("Name: ", input$text_input,"\n")
    })
  })
})

library(ggplot2)
library(shiny)
#source("globalDataFrames.r")

#
headers <- colnames(fall2023HittersStats)[-1]
positionList <- list("All", "C", "1B", "2B", "SS", "3B", "OF")

shinyServer(function(input, output) {
  output[["stat"]] <- renderUI({
    selectInput("stat", "Select a stat:", choices = headers)
  })
  
  output[["position"]] <- renderUI({
    selectInput("position", "Select a postion:", choices= positionList)
    
  })
  
    selectedPosition <- reactive({
      as.character(input[["position"]])
    })
    
    selectedData <- reactive({

      if(selectedPosition() != "All"){
        subset(fall2023HittersStats, input[["position"]] == Position)
      }
      else  
      {
        fall2023HittersStats
      }
    
    })
    
    
      output[["barplot"]] <- renderPlot({
    
      data <- data.frame(Player = selectedData()[["Hitter"]], metric = selectedData()[,input[["stat"]]])
      avg <- mean(selectedData()[,input[["stat"]]])
    # Create a bar chart
    
    #ggplot(selectedData(), aes(x = Hitter, y = input[["stat"]])) +
      ggplot(data, aes(x = reorder(Player, -metric), y = metric)) +
        geom_bar(stat = "identity", fill = "blue") +
        labs(title = "Metric", x = "Player", y = input[["stat"]]) + 
        geom_text(aes(x = 20, y = avg+.1, label = round(avg, 3)), hjust = -0.1, vjust = 0, color = "red") +
        geom_hline(yintercept = avg, color = "red", linetype = "solid", linewidth = 1) +
        theme(axis.text.x = element_text(angle = 90, hjust = 1) )
    
  })
})

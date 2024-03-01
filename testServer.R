# install.packages("plotly")
# install.packages("htmlwidgets")
singleStr <- paste(input[[1]], collapse = "")

# Split the combined string into separate values
splitVals <- unlist(strsplit(singleStr, ","))

# Initialize an empty list to store the lists
lists <- list()

# Initialize an empty list to store the current sublist
tempList <- list()

# Iterate over the split values
for (string in splitVals) {
  found <- FALSE
  print(string)
  # Check if the current string contains the "\r\n" characters
  if (grepl("\r\n", string)) {
    found = TRUE
    
    # Split the string that contains \r\n into two seperate strings
    splitStrings = strsplit(string,"\r\n")
    tempList <- append(tempList,splitStrings[[1]][1])
    # If it does, add the temporary list to the list of lists
    lists <- append(lists, list(tempList))
    
    # Reset the temporary list
    tempList <- list()
  }
  if(!found){
    # Append the current string to the temporary list
    tempList <- append(tempList, string)
  }
  else{
    # Append the second string after \r\n  to the temporary list
    tempList <- append(tempList, splitStrings[[1]][2])
  }
}
lists <- append(lists,list(tempList))

max_length <- max(sapply(lists, length))

lists <- lapply(lists, function(x) {
  if (length(x) < max_length) {
    x <- c(x, rep(NA, max_length - length(x)))
  }
  return(x)
})



dataDF <- do.call(rbind, lists)

colnames(dataDF) <- dataDF[1,]
dataDF <- dataDF[-1,]

# colnames(dataDF)

#p <- plot_ly(dataDF, x = ~x, y = ~y, type = "bar")

# Convert the graph to an HTML widget
#widget <- htmlwidgets::saveWidget(p, "path/to/output/widget.html", selfcontained = TRUE)
library(ggplot2)

# Template of how to convert the imputed string to a data frame properly got from 
# ChatGPT
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
  # Check if the current string contains the "\r\n" characters
  if (grepl("\r\n", string)) {
    found <- TRUE
    
    # Split the string that contains \r\n into two separate strings
    splitStrings <- strsplit(string, "\r\n")
    tempList <- append(tempList, splitStrings[[1]][1])
    
    # If it does, add the temporary list to the list of lists
    lists <- append(lists, list(tempList))
    
    # Reset the temporary list
    tempList <- list()
  }
  if (!found) {
    # Append the current string to the temporary list
    tempList <- append(tempList, string)
  } else {
    # Append the second string after \r\n to the temporary list
    tempList <- append(tempList, splitStrings[[1]][2])
  }
}
lists <- append(lists, list(tempList))

max_length <- max(sapply(lists, length))

lists <- lapply(lists, function(x) {
  if (length(x) < max_length) {
    x <- c(x, rep(NA, max_length - length(x)))
  }
  return(x)
})

# Create a data frame
dataDF <- as.data.frame(do.call(rbind, lists), stringsAsFactors = FALSE)

# Set column names
colnames(dataDF) <- dataDF[1,]
dataDF <- dataDF[-1,]
colnames(dataDF) <- gsub('list\\((.*)\\)', '\\1', colnames(dataDF))
colnames(dataDF) <- gsub("[\"\\\\]", "", colnames(dataDF), perl = TRUE)

dataDF[["Hitter"]] <- unlist(dataDF[["Hitter"]])


# Convert all columns except the first one to numeric
dataDF[, -1] <- lapply(dataDF[, -1], as.numeric)

# Plotting using ggplot with numeric indices
#col_indices <- setNames(seq_along(names(dataDF)), names(dataDF))

avg <- mean(dataDF[["Hits"]])

p <- ggplot(dataDF, aes(x = reorder(Hitter, -Hits), y = Hits)) +
  geom_bar(stat = "identity", fill = "blue") +
  labs(title = "Hits By Player", x = "Player", y = "Hits" ) +
  geom_text(aes(x = 20, y = avg+.1, label = round(avg, 3)), hjust = -0.1, vjust = 0, color = "red") +
  geom_hline(yintercept = avg, color = "red", linetype = "solid", linewidth = 1) +
  theme(axis.text.x = element_text(angle = 90, hjust = 1))

ggsave("./public/barplot.png", plot = p, width = 6, height = 4, dpi = 300)

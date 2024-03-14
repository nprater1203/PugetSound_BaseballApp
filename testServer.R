library(ggplot2)

# Example input
#input <- "Hitter,AB ,PA,Hits,1B,2B,3B,HR,BB,HP,K's,TB's,R,RBI,SB,Execution Success,Execution F,Execution%,BA,OBP,Slugging,OPS,WOBA,Total Chances,Total Plays,Errors,FP,Sacs,Passed Balls\r\nC.Allen,9,11,3,2,1,0,0,2,0,0,4,3,2,0,1,1,50.00%,0.333,0.455,0.444,0.899,0.402,5,4,1,0.800,0,\r\nBlocher,8,12,1,0,0,0,1,3,1,2,4,2,1,0,0,0,#DIV/0!,0.125,0.417,0.500,0.917,0.408,7,7,0,1.000,0,\r\nBrennan,7,10,2,1,1,0,0,3,0,3,3,1,1,0,0,0,#DIV/0!,0.286,0.500,0.429,0.929,0.423,6,5,1,0.833,0,\r\nFranklin,11,12,7,7,0,0,0,0,0,0,7,1,4,0,2,0,100.00%,0.636,0.583,0.636,1.220,0.518,1,0,1,0.000,1,\r\nHirano,9,11,4,3,1,0,0,2,0,1,5,1,1,0,2,0,100.00%,0.444,0.545,0.556,1.101,0.483,8,8,0,1.000,0,\r\nHowton,9,12,4,4,0,0,0,3,0,0,4,0,1,0,1,0,100.00%,0.444,0.583,0.444,1.028,0.469,0,0,0,#DIV/0!,0,\r\nKamiharah RH,3,5,0,0,0,0,0,2,0,1,0,1,0,0,0,0,#DIV/0!,0.000,0.400,0.000,0.400,0.276,10,10,0,1.000,0,\r\nKamiharah LH,6,8,1,1,0,0,0,1,1,2,1,1,0,0,0,0,#DIV/0!,0.167,0.375,0.167,0.542,0.287,0,0,0,#DIV/0!,0,\r\nKrebs,13,13,6,5,1,0,0,0,0,3,7,2,0,0,0,0,#DIV/0!,0.462,0.462,0.538,1.000,0.439,13,12,1,0.923,0,\r\nMurashige,11,12,2,2,0,0,0,1,0,0,2,0,2,0,0,0,#DIV/0!,0.182,0.250,0.182,0.432,0.206,5,4,1,0.800,0,\r\nNabeta,7,12,1,0,0,0,0,5,0,2,1,1,0,0,1,0,100.00%,0.143,0.500,0.143,0.643,0.288,0,0,0,#DIV/0!,0,\r\nRobman,10,13,2,2,0,0,0,2,1,0,2,0,0,0,1,0,100.00%,0.200,0.385,0.200,0.585,0.298,0,0,0,#DIV/0!,0,\r\nSullivan,11,11,2,2,0,0,0,0,0,1,2,0,0,0,0,1,0.00%,0.182,0.182,0.182,0.364,0.161,2,1,1,0.500,0,\r\nTeruya,9,11,3,2,1,0,0,2,0,2,4,0,6,0,4,0,100.00%,0.333,0.455,0.444,0.899,0.402,6,3,3,0.500,0,\r\nVelasco,10,11,2,1,1,0,0,1,0,2,3,0,0,0,0,2,0.00%,0.200,0.273,0.300,0.573,0.259,9,6,3,0.667,0,\r\nSpero,7,9,2,0,0,0,2,0,2,2,8,3,3,0,0,1,0.00%,0.286,0.444,1.143,1.587,0.627,4,3,1,0.750,0,\r\nMakishima,9,11,4,3,1,0,0,2,0,1,5,2,0,0,0,0,#DIV/0!,0.444,0.545,0.556,1.101,0.483,0,0,0,#DIV/0!,0,\r\nO'Brien,10,12,3,3,0,0,0,2,0,1,3,1,1,0,0,1,0.00%,0.300,0.417,0.300,0.717,0.337,6,5,1,0.833,0,\r\nCrockett,12,12,2,2,0,0,0,0,0,2,2,1,2,0,4,0,100.00%,0.167,0.167,0.167,0.333,0.148,5,5,0,1.000,0,\r\nNakamura,6,7,3,3,0,0,0,0,1,1,3,1,2,0,1,1,50.00%,0.500,0.571,0.500,1.071,0.483,2,1,1,0.500,0,\r\nUeyama,10,12,5,4,1,0,0,2,0,2,6,4,3,2,0,1,0.00%,0.500,0.583,0.600,1.183,0.517,9,8,1,0.889,0,\r\nDeggeller,8,12,1,1,0,0,0,4,0,4,1,3,0,1,0,0,#DIV/0!,0.125,0.417,0.125,0.542,0.304,5,4,1,0.800,0,\r\nKaneshiro,10,10,3,2,1,0,0,0,0,1,4,2,2,0,0,0,#DIV/0!,0.300,0.300,0.400,0.700,0.3047,1,1,0,1.000,0,\r\nLettiere,10,12,3,3,0,0,0,1,1,0,3,3,0,0,0,2,0.00%,0.300,0.417,0.300,0.717,0.340,6,6,0,1.000,0,\r\nUjimori,7,11,1,1,0,0,0,4,0,2,1,2,0,2,1,0,100.00%,0.143,0.455,0.143,0.597,0.332,3,3,0,1.000,0,\r\nComeaux,9,10,0,0,0,0,0,1,0,0,0,1,1,0,3,0,100.00%,0.000,0.100,0.000,0.100,0.069,11,6,2,0.545,0,\r\nVines,9,11,2,2,0,0,0,2,0,3,2,0,0,0,1,0,100.00%,0.222,0.364,0.222,0.586,0.287,0,0,0,#DIV/0!,0,4"

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

p <- ggplot(dataDF, aes(x = reorder(Hitter, -Hits), y = Hits)) +
  geom_bar(stat = "identity", fill = "blue") +
  labs(title = "Hits By Player", x = "Player", y = "Hits" )
theme(axis.text.x = element_text(angle = 90, hjust = 1))

ggsave("./public/barplot.png", plot = p, width = 6, height = 4, dpi = 300)

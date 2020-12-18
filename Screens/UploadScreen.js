import React from "react";
import { View, StyleSheet, Modal, Image } from "react-native";
import * as Progress from "react-native-progress";
import { Video } from 'expo-av';

import colors from "../config/colors";

function UploadScreen({ onDone, progress = 0, visible = false }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <Progress.Bar
            color={colors.primary}
            progress={progress}
            width={200}
          />
        ) : (
            <Video
                source={require('../assets/animations/done.mp4')}
                rate={0.5}
                isMuted={true}
                resizeMode="cover"
                shouldPlay
                style={styles.animation}
                onPlaybackStatusUpdate={obj => {
                    if(obj.didJustFinish){
                        onDone();
                    }
                }}
            />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default UploadScreen;

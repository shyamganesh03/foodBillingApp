const { exec } = require('shell-utils')
const path = require('os').tmpdir()

run()

function run() {
  exec.killPort(8081)
  exec.execSync(`watchman watch-del-all || true`)
  exec.execSync(
    `rm -rf packages/mobile/ios/build && (killall Xcode || true) && cd packages/mobile/ios && xcrun -k && xcodebuild -alltargets clean && cd ..`,
  )
  exec.execSync(
    `find . -name "node_modules" -type d -prune -exec rm -rf '{}' +`,
  )

  exec.execSync(`rm -rf ~/.rncache`)
  exec.execSync(
    `rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang/ModuleCache"`,
  )
  exec.execSync(
    `rm -rf "$(getconf DARWIN_USER_CACHE_DIR)/org.llvm.clang.$(whoami)/ModuleCache"`,
  )
  exec.execSync(`rm -rf ~/Library/Developer/Xcode/DerivedData/`)
  exec.execSync(`rm -fr ~/Library/Caches/com.apple.dt.Xcode/`)
  exec.execSync(`rm -rf packages/mobile/ios/DerivedData/*`)
  exec.execSync(`rm -rf packages/mobile/ios/Pods`)
  exec.execSync(`rm -rf packages/mobile/ios/build`)
  exec.execSync(`rm -rf packages/mobile/android/build`)
  exec.execSync(`rm -rf packages/mobile/lib/android/build`)
  exec.execSync(`rm -rf packages/mobile/android/app/build`)
  exec.execSync(`rm -rf packages/mobile/lib/android/app/build`)

  exec.execSync(`rm -rf ${path}/react-native-packager-cache-*`)
  exec.execSync(`rm -rf ${path}/metro-*`)
  exec.execSync(`rm -rf ${path}/react-*`)
  exec.execSync(`rm -rf ${path}/haste-*`)
}
